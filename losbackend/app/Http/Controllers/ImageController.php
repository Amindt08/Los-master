<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class ImageController extends Controller
{
    public function tambahImage(Request $request)
{
    $request->validate([
        'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

    return DB::transaction(function () use ($request) {
        $data = new Image;

        // Lock tabel sebelum mengambil kode terakhir
        DB::table('image')->lockForUpdate()->get();

        $kodeTerakhir = Image::max('Kode');
        $nomorBaru = ($kodeTerakhir ?? 0) + 1;

        $data->Kode = $nomorBaru;

        if ($request->hasFile('image')) {
            $fileName = $request->file('image')->getClientOriginalName();
            $request->file('image')->move('images/', $fileName);
            $data->image = $fileName;
            $data->save();
        }

        return response()->json(['message' => 'Gambar berhasil diunggah', 'image' => $data]);
    });
}


    public function getImage()
    {
        $image = Image::all();
        return response()->json($image);
    }

    public function updateImage(Request $request, $id)
    {
        $image = Image::where('Kode', $id)->firstOrFail();

        if ($request->hasFile('Image')) {
            $request->validate([
                'Image' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

            // Hapus gambar lama jika ada
            if ($image->image && Storage::disk('public')->exists($image->image)) {
                Storage::disk('public')->delete($image->image);
            }

            $file = $request->file('Image');
            $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('Image', $filename, 'public');
            $image->image = $path;
        }

        $image->save();
        return response()->json(['message' => 'Gambar berhasil diperbarui', 'image' => $image]);
    }

    public function deleteImage($id)
    {
        $image = Image::where('Kode', $id)->first();
        if (!$image) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        if ($image->Image && Storage::disk('public')->exists($image->Image)) {
            Storage::disk('public')->delete($image->Image);
        }

        $image->delete();
        return response()->json(['message' => 'Data berhasil dihapus']);
    }
}
