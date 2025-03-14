<?php

namespace App\Http\Controllers;

use App\Models\DeskripsiMkLite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class DeskripsiMkLiteController extends Controller
{

    public function tambahDeskripsiMkLite(Request $request)
    {
        return DB::transaction(function () use ($request) {
            $dekripsi = new DeskripsiMkLite;
            
            DB::table('deskripsi')->lockForUpdate()->get();

            $kodeTerakhir = DeskripsiMkLite::max('Kode');
            $nomorBaru = ($kodeTerakhir ?? 0) + 1;

            $dekripsi->Kode = $nomorBaru;
            
            $dekripsi->Keterangan = $request->input('Keterangan');
            $dekripsi->save();

            return response()->json($dekripsi);
        });
    }

    public function getDeskripsiMkLite()
    {
        $deskripsi = DeskripsiMkLite::all();
        return response()->json($deskripsi);
    }

    public function getDeskripsiMkLiteById($id)
    {
        $deskripsi = DeskripsiMkLite::where('Kode', $id)->first();

        if (!$deskripsi) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }
        return response()->json($deskripsi);
    }

    public function updateDeskripsiMkLite(Request $request, string $id)
    {
        $deskripsi = DeskripsiMkLite::where('Kode', $id)->firstOrFail();
        $deskripsi->update($request->all());
        return response()->json($deskripsi);
    }

    public function deleteDeskripsiMkLite($id)
    {
        $deskripsi = DeskripsiMkLite::where('Kode', $id)->first();
        if (!$deskripsi) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }
        $deskripsi->delete();
        return response()->json(['message' => 'Data berhasil dihapus']);
    }
}
