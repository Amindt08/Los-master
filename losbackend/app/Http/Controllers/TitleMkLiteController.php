<?php

namespace App\Http\Controllers;

use App\Models\TitleMkLite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class TitleMkLiteController extends Controller
{

    public function tambahTitleMkLite(Request $request)
    {
        return DB::transaction(function () use ($request) {
            $title = new TitleMkLite;
            
            DB::table('judul_customer')->lockForUpdate()->get();

            $kodeTerakhir = TitleMkLite::max('Kode');
            $nomorBaru = ($kodeTerakhir ?? 0) + 1;

            $title->Kode = $nomorBaru;
            
            $title->Keterangan = $request->input('Keterangan');
            $title->save();

            return response()->json($title);
        });
    }

    public function getTitleMkLite()
    {
        $title = TitleMkLite::all();
        return response()->json($title);
    }

    public function getTitleMkLiteById($id)
{
    $title = TitleMkLite::where('Kode', $id)->first();

    if (!$title) {
        return response()->json(['message' => 'Data tidak ditemukan'], 404);
    }
    return response()->json($title);
}

    public function updateTitleMkLite(Request $request, string $id)
    {
        $title = TitleMkLite::where('Kode', $id)->firstOrFail();
        $title->update($request->all());
        return response()->json($title);
    }

    public function deleteTitleMkLite($id)
    {
        $title = TitleMkLite::where('Kode', $id)->first();
        if (!$title) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }
        $title->delete();
        return response()->json(['message' => 'Data berhasil dihapus']);
    }
}
