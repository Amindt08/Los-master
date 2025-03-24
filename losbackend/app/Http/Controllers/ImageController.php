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
        Log::info($request);
        Log::info('Data yang diterima:', $request->all()); // Log data masuk
        $request->validate([
            'id_section' => 'required|numeric',
            'gambar' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ]);

        return DB::transaction(function () use ($request) {
            $data = new Image;

            DB::table('section_gambar')->lockForUpdate()->get();

            $data->id_section = $request->input('id_section');

            if ($request->hasFile('gambar')) {
                $fileName = $request->file('gambar')->getClientOriginalName();
                $request->file('gambar')->move('images/', $fileName);
                $data->gambar = $fileName;
                $data->save();
            }

            return response()->json([
                'message' => 'Gambar berhasil diunggah',
                'text' => 'Gambar berhasil disimpan dengan ID: ' . $data->id_section,
            ]);
        });
    }

    public function getImageById($id)
    {
        $data = Image::where('id', $id)->first();

        if (!$data) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }
        return response()->json($data);
    }

    public function getImage()
    {
        $data = Image::all();
        return response()->json($data);
    }

    public function updateImage(Request $request, $id)
    {
        $data = Image::where('Kode', $id)->firstOrFail();

        if ($request->hasFile('image')) {
            $request->validate([
                'image' => 'image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
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

    public function deleteImage($id)
    {
        $data = Image::where('id', $id)->first();
        if (!$data) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        if ($data->gambar && Storage::disk('public')->exists($data->gambar)) {
            Storage::disk('public')->delete($data->gambar);
        }

        $data->delete();
        return response()->json(['message' => 'Data berhasil dihapus']);
    }
}
