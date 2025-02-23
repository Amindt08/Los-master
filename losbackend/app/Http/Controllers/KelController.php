<?php

namespace App\Http\Controllers;

use App\Models\RefKel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;


class KelController extends Controller
{

    public function tambahKel(Request $request)
    {
        $kel = new RefKel;
        $kodeTerakhir = RefKel::max('Kode');
        $nomorBaru = $kodeTerakhir ? (int) substr($kodeTerakhir, 3) + 1 : 1;
        Log::info($request->input('kecamatan_id'));
        $kel->Kode = sprintf('WKL%07d', $nomorBaru);
        $kel->Keterangan = $request->input('Keterangan');
        $kel->kecamatan_id = $request->input('kecamatan_id'); //tambah id kecamatan
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
