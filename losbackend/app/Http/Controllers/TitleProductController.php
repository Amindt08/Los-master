<?php

namespace App\Http\Controllers;

use App\Models\TitleProduct;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class TitleProductController extends Controller
{

    public function tambahTitleProduct(Request $request)
    {
        return DB::transaction(function () use ($request) {
            $title = new TitleProduct;
            
            DB::table('deskripsi')->lockForUpdate()->get();

            $kodeTerakhir = TitleProduct::max('Kode');
            $nomorBaru = ($kodeTerakhir ?? 0) + 1;

            $title->Kode = $nomorBaru;
            
            $title->Keterangan = $request->input('Keterangan');
            $title->save();

            return response()->json($title);
        });
    }

    public function getTitleProduct()
    {
        $title = TitleProduct::all();
        return response()->json($title);
    }

    public function getTitleProductById($id)
{
    $title = TitleProduct::where('Kode', $id)->first();

    if (!$title) {
        return response()->json(['message' => 'Data tidak ditemukan'], 404);
    }
    return response()->json($title);
}

    public function updateTitleProduct(Request $request, string $id)
    {
        $title = TitleProduct::where('Kode', $id)->firstOrFail();
        $title->update($request->all());
        return response()->json($title);
    }

    public function deleteTitleProduct($id)
    {
        $title = TitleProduct::where('Kode', $id)->first();
        if (!$title) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }
        $title->delete();
        return response()->json(['message' => 'Data berhasil dihapus']);
    }
}
