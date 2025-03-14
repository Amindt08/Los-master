<?php

namespace App\Http\Controllers;

use App\Models\Topbar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class TopbarController extends Controller
{

    public function tambahTopbar(Request $request)
    {
        return DB::transaction(function () use ($request) {
            $data = new Topbar;
            
            DB::table('deskripsi')->lockForUpdate()->get();

            $kodeTerakhir = Topbar::max('Kode');
            $nomorBaru = ($kodeTerakhir ?? 0) + 1;

            $data->Kode = $nomorBaru;
            
            $data->label = $request->input('label');
            $data->save();

            return response()->json($data);
        });
    }

    public function getTopbar()
    {
        $data = Topbar::all();
        return response()->json($data);
    }

    public function getTopbarById($id)
    {
        $data = Topbar::where('Kode', $id)->first();

        if (!$data) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }
        return response()->json($data);
    }

    public function updateTopbar(Request $request, string $id)
    {
        $data = Topbar::where('Kode', $id)->firstOrFail();
        $data->update($request->all());
        return response()->json($data);
    }

    public function deleteTopbar($id)
    {
        $data = Topbar::where('Kode', $id)->first();
        if (!$data) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }
        $data->delete();
        return response()->json(['message' => 'Data berhasil dihapus']);
    }
}
