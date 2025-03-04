<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImageController extends Controller
{
    public function tambahImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $image = new image;
        $kodeTerakhir = image::max('Kode');
        $nomorBaru = $kodeTerakhir ? $kodeTerakhir + 1 : 1;
        $image->Kode = $nomorBaru;

        $image = image::create($request->all());

        if($request->hasFile('image')){
            $request->file('image')->move('images/', $request->file('image')->getClientOriginalName());
            $image->image = $request->file('image')->getClientOriginalName();
            $image->save();

            return response()->json(['message' => 'Gambar berhasil diunggah', 'image' => $image]);
        }

        return response()->json(['message' => 'Gagal mengunggah gambar'], 400);
    }

    public function getImage()
    {
        $images = Image::all();
        return response()->json($images);
    }

    public function updateImage(Request $request, $id)
    {
        $images = Image::where('Kode', $id)->firstOrFail();
        
        if ($request->hasFile('Image')) {
            $request->validate([
                'Image' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

            // Hapus gambar lama jika ada
            if ($images->Image && Storage::disk('public')->exists($images->Image)) {
                Storage::disk('public')->delete($images->Image);
            }

            $file = $request->file('Image');
            $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('Image', $filename, 'public');
            $images->Image = $path;
        }

        $images->save();
        return response()->json(['message' => 'Gambar berhasil diperbarui', 'image' => $images]);
    }

    public function deleteImage($id)
    {
        $images = Image::where('Kode', $id)->first();
        if (!$images) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        if ($images->Image && Storage::disk('public')->exists($images->Image)) {
            Storage::disk('public')->delete($images->Image);
        }

        $images->delete();
        return response()->json(['message' => 'Data berhasil dihapus']);
    }
}
