<?php

namespace App\Http\Controllers;

use App\Models\Deskripsi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class DeskripsiController extends Controller
{

    public function tambahDeskripsi(Request $request)
    {
        return DB::transaction(function () use ($request) {
            $dekripsi = new Deskripsi;
            
            DB::table('deskripsi')->lockForUpdate()->get();

            $kodeTerakhir = Deskripsi::max('Kode');
            $nomorBaru = ($kodeTerakhir ?? 0) + 1;

            $dekripsi->Kode = $nomorBaru;
            
            $dekripsi->Keterangan = $request->input('Keterangan');
            $dekripsi->save();

            return response()->json($dekripsi);
        });
    }

    public function getDeskripsi()
    {
        $deskripsi = Deskripsi::all();
        return response()->json($deskripsi);
    }

    public function getDeskripsiById($id)
    {
        $deskripsi = Deskripsi::where('Kode', $id)->first();

        if (!$deskripsi) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }
        return response()->json($deskripsi);
    }

    public function updateDeskripsi(Request $request, string $id)
    {
        $deskripsi = Deskripsi::where('Kode', $id)->firstOrFail();
        $deskripsi->update($request->all());
        return response()->json($deskripsi);
    }

    public function deleteDeskripsi($id)
    {
        $deskripsi = Deskripsi::where('Kode', $id)->first();
        if (!$deskripsi) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }
        $deskripsi->delete();
        return response()->json(['message' => 'Data berhasil dihapus']);
    }
}
