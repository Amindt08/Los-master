<?php

namespace App\Http\Controllers;

use App\Models\ImageCustomer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class ImageCustomerController extends Controller
{
    public function tambahImageCustomer(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        return DB::transaction(function () use ($request) {
            $data = new ImageCustomer;

            DB::table('image')->lockForUpdate()->get();

            $kodeTerakhir = ImageCustomer::max('Kode');
            $nomorBaru = ($kodeTerakhir ?? 0) + 1;

            $data->Kode = $nomorBaru;

            if ($request->hasFile('image')) {
                $fileName = $request->file('image')->getClientOriginalName();
                $request->file('image')->move('customer_images/', $fileName);
                $data->image = $fileName;
                $data->save();
            }

            return response()->json(['message' => 'Gambar berhasil diunggah', 'image' => $data]);
        });
    }

    public function getImageCustomerById($id)
    {
        $data = ImageCustomer::where('Kode', $id)->first();

        if (!$data) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }
        return response()->json($data);
    }

    public function getImageCustomer()
    {
        $data = ImageCustomer::all();
        return response()->json($data);
    }

    public function updateImageCustomer(Request $request, $id)
    {
        $data = ImageCustomer::where('Kode', $id)->firstOrFail();

        if ($request->hasFile('image')) {
            $request->validate([
                'image' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

            $oldImagePath = 'images/' . $data->image; 
            if ($data->image && file_exists(public_path($oldImagePath))) {
                unlink(public_path($oldImagePath)); 
            }

            $file = $request->file('image');
            $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('images'), $filename);
            $data->image = 'images/' . $filename;
            
        }

        $data->save();
        return response()->json(['message' => 'Gambar berhasil diperbarui', 'image' => $data]);
    }

    public function deleteImageCustomer($id)
    {
        $data = ImageCustomer::where('Kode', $id)->first();
        if (!$data) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        if ($data->Image && Storage::disk('public')->exists($data->Image)) {
            Storage::disk('public')->delete($data->Image);
        }

        $data->delete();
        return response()->json(['message' => 'Data berhasil dihapus']);
    }
}
