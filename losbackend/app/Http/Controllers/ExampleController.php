<?php
namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Example;

class ExampleController extends Controller
{
    public function index()
    {
        $data = Example::with('submenus')->get();
        return response()->json($data);
    }

    public function tambahNav(Request $request)
    {
        $request->validate([
            'kode_navbar' => 'required|string|max:255',
            'nama' => 'required|string|max:255',
            'link_to' => 'required|string|max:255',
        ]);
    
        return DB::transaction(function () use ($request) {
            $data = new Example();
            $data->kode_navbar = $request->input('kode_navbar');
            $data->nama = $request->input('nama');
            $data->link_to = $request->input('link_to');
            $data->save();
    
            return response()->json($data);
        });
    }
    



    public function getNav()
    {
        $data = Example::all();
        return response()->json($data);
    }

    public function getNavById($id)
{
    $data = Example ::where('id', $id)->first();

    if (!$data) {
        return response()->json(['message' => 'Data tidak ditemukan'], 404);
    }
    return response()->json($data);
}


    public function updateNav(Request $request, string $id)
    {
        $data = Example::where('id', $id)->firstOrFail();
        $data->update($request->all());
        return response()->json($data);
    }

    public function deleteNav($id)
    {
        $data = Example::where('id', $id)->first();
        if (!$data) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }
        $data->delete();
        return response()->json(['message' => 'Data berhasil dihapus']);
    }

}