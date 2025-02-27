<?php

namespace App\Http\Controllers;

use App\Models\RefKodepos;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class KodeposController extends Controller
{

    public function tambahKodepos(Request $request)
    {
        $kodepos = new RefKodepos;
        $kodepos->Kode = $request->input('Kode');
        // $kodeTerakhir = RefKodepos::max('Kode');
        // $nomorBaru = $kodeTerakhir ? (int) substr($kodeTerakhir, 3) + 1 : 1;
        // $kodepos->Kode = sprintf('WKP%07d', $nomorBaru);
        $kodepos->Keterangan = $request->input('Keterangan');
        $kodepos->kecamatan_id = $request-> input('kecamatan_id');
        Log::info($request->input('kecamatan_id'));
        $kodepos->save();

        return response()->json($kodepos);
    }

    public function getKodepos()
    {
        $kodepos = RefKodepos::all();
        return response()->json($kodepos);
    }

    public function updateKodepos(Request $request, string $id)
    {
        $kodepos = RefKodepos::where('Kode', $id)->firstOrFail();
        $kodepos->update($request->all());
        return response()->json($kodepos);
    }

    public function deleteKodepos($id)
    {
        $kodepos = RefKodepos::where('Kode', $id)->first();
        if (!$kodepos) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }
        $kodepos->delete();
        return response()->json(['message' => 'Data berhasil dihapus']);
    }
}
