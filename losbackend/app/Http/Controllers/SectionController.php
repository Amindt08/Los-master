<?php

namespace App\Http\Controllers;

use App\Models\Section;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;



class SectionController extends Controller
{

    public function tambahSection(Request $request)
    {
        Log::info($request);
        Log::info('Data yang diterima:', $request->all()); // Log data masuk
        return DB::transaction(function () use ($request) {
            $data = new Section;
            
            $data->section = $request->input('section');
            $data->judul = $request->input('judul');
            $data->deskripsi = $request->input('deskripsi');
            // $data->id_gambar = data_get($request->input('id_gambar'), 'id');
            $data->id_gambar = $request->input('id_gambar');
            $data->kontak = $request->input('kontak');
            $data->save();

            return response()->json($data);
        });
    }

    public function getSection()
    {
        $data = Section::all();
        return response()->json($data);
    }

    public function getSectionById($id)
    {
        $data = Section::where('id', $id)->first();

        if (!$data) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }
        return response()->json($data);
    }

    public function updateSection(Request $request, string $id)
    {
        $data = Section::where('id', $id)->firstOrFail();
        $data->update($request->all());
        return response()->json($data);
    }

    public function deleteSection($id)
    {
        $data = Section::where('id', $id)->first();
        if (!$data) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }
        $data->delete();
        return response()->json(['message' => 'Data berhasil dihapus']);
    }
}
