<?php

namespace App\Http\Controllers;

use App\Models\SidebarProduct;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class SidebarProductController extends Controller
{

    public function tambahSidebarProduct(Request $request)
    {
        return DB::transaction(function () use ($request) {
            $data = new SidebarProduct;
            
            DB::table('sidebar_product')->lockForUpdate()->get();

            $kodeTerakhir = SidebarProduct::max('Kode');
            $nomorBaru = ($kodeTerakhir ?? 0) + 1;

            $data->Kode = $nomorBaru;
            
            $data->Keterangan = $request->input('Keterangan');
            $data->save();

            return response()->json($data);
        });
    }

    public function getSidebarProduct()
    {
        $data = SidebarProduct::all();
        return response()->json($data);
    }

    public function getSidebarProductById($id)
{
    $data = SidebarProduct::where('Kode', $id)->first();

    if (!$data) {
        return response()->json(['message' => 'Data tidak ditemukan'], 404);
    }
    return response()->json($data);
}

    public function updateSidebarProduct(Request $request, string $id)
    {
        $data = SidebarProduct::where('Kode', $id)->firstOrFail();
        $data->update($request->all());
        return response()->json($data);
    }

    public function deleteSidebarProduct($id)
    {
        $data = SidebarProduct::where('Kode', $id)->first();
        if (!$data) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }
        $data->delete();
        return response()->json(['message' => 'Data berhasil dihapus']);
    }
}
