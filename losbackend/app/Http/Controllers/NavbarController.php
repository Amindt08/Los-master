<?php

namespace App\Http\Controllers;

use App\Models\Navbar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class NavbarController extends Controller
{

    public function tambahNavbar(Request $request)
    {
        return DB::transaction(function () use ($request) {
            $navbar = new Navbar;
            
            DB::table('deskripsi')->lockForUpdate()->get();

            $kodeTerakhir = Navbar::max('Kode');
            $nomorBaru = ($kodeTerakhir ?? 0) + 1;

            $navbar->Kode = $nomorBaru;
            
            $navbar->label = $request->input('label');
            $navbar->save();

            return response()->json($navbar);
        });
    }

    public function getNavbar()
    {
        $navbar = Navbar::all();
        return response()->json($navbar);
    }

    public function getNavbarById($id)
    {
        $navbar = Navbar::where('Kode', $id)->first();

        if (!$navbar) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }
        return response()->json($navbar);
    }

    public function updateNavbar(Request $request, string $id)
    {
        $navbar = Navbar::where('Kode', $id)->firstOrFail();
        $navbar->update($request->all());
        return response()->json($navbar);
    }

    public function deleteNavbar($id)
    {
        $navbar = Navbar::where('Kode', $id)->first();
        if (!$navbar) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }
        $navbar->delete();
        return response()->json(['message' => 'Data berhasil dihapus']);
    }
}
