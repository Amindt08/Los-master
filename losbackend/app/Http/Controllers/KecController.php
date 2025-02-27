<?php

namespace App\Http\Controllers;

use App\Models\RefKec;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;


class KecController extends Controller
{

    public function tambahKec(Request $request)
    {
        $kec = new RefKec;
        $kodeTerakhir = RefKec::max('Kode');
        $nomorBaru = $kodeTerakhir ? $kodeTerakhir + 1 : 1;
        $kec->Kode = $nomorBaru;
        $kec->Keterangan = $request->input('Keterangan');
        $kec->kota_id = $request->input('kota_id'); //tambah id kota
        $kec->save();

        return response()->json($kec);
    }

    public function getKec()
    {
        $kec = RefKec::all();
        return response()->json($kec);
    }

    public function updateKec(Request $request, string $id)
    {
        $kec = RefKec::where('Kode', $id)->firstOrFail();
        $kec->update($request->all());
        return response()->json($kec);
    }

    public function deleteKec($id)
    {
        $kec = RefKec::where('Kode', $id)->first();
        if (!$kec) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }
        $kec->delete();
        return response()->json(['message' => 'Data berhasil dihapus']);
    }
}
