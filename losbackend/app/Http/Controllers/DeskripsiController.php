<?php

namespace App\Http\Controllers;

use App\Models\Deskripsi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class DeskripsiController extends Controller
{

    public function tambahDeskripsi(Request $request)
    {
        $dekripsi = new Deskripsi;
        $kodeTerakhir = Deskripsi::max('Kode');
        $nomorBaru = $kodeTerakhir ? $kodeTerakhir +1 : 1;
        $dekripsi->Kode = $nomorBaru;
        $dekripsi->Keterangan = $request->input('Keterangan');
        $dekripsi->save();

        return response()->json($dekripsi);
    }

    public function getDeskripsi()
    {
        $deskripsi = Deskripsi::all();
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
