<?php

namespace App\Http\Controllers;

use App\Models\RefKel;
use Illuminate\Http\Request;

class KelController extends Controller
{

    public function tambahKel(Request $request)
    {
        $kel = new RefKel;
        $kodeTerakhir = RefKel::max('Kode');
        $nomorBaru = $kodeTerakhir ? (int) substr($kodeTerakhir, 3) + 1 : 1;
        $kel->Kode = sprintf('WKL%07d', $nomorBaru);
        $kel->Keterangan = $request->input('Keterangan');
        $kel->save();

        return response()->json($kel);
    }

    public function getKel()
    {
        $kel = RefKel::all();
        return response()->json($kel);
    }

    public function updateKel(Request $request, string $id)
    {
        $kel = RefKel::where('Kode', $id)->firstOrFail();
        $kel->update($request->all());
        return response()->json($kel);
    }

    public function deleteKel($id)
    {
        $kel = RefKel::where('Kode', $id)->first();
        if (!$kel) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }
        $kel->delete();
        return response()->json(['message' => 'Data berhasil dihapus']);
    }
}
