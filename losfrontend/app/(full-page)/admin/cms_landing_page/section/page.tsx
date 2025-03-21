import React, { useState, useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import axios from 'axios';
import { API_ENDPOINTS } from '@/app/api/losbackend/api';
import DataTableWithCRUD from '@/app/(full-page)/admin/component/datatable3/page';
import { ProgressSpinner } from 'primereact/progressspinner';

const TambahSection = () => {
    const [Section, setSection] = useState([]);
    const [Gambar, setGambar] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const toast = useRef<Toast>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const sectionResponse = await axios.get(API_ENDPOINTS.GETSECTION);
            setSection(sectionResponse.data);
            const gambarResponse = await axios.get(API_ENDPOINTS.GETIMAGE);
            console.log(gambarResponse.data);

            setGambar(gambarResponse.data);
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Gagal mengambil data', life: 3000 });
        } finally {
            setIsLoading(false);
        }
    };

    const handleAdd = async (section: string, judul: string, deskripsi: string, id_gambar: number, kontak: string) => {
        try {
            console.log("Mengirim data:", { section, judul, deskripsi, id_gambar, kontak });
            await axios.post(API_ENDPOINTS.TAMBAHSECTION, { section, judul, deskripsi, id_gambar: Number(id_gambar), kontak });
            toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Data berhasil ditambahkan', life: 3000 });
            fetchData();
        } catch (error) {
            console.error('Error adding data:', error);
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Gagal menambahkan data', life: 3000 });
        }
    };

    const handleUpdate = async (id: string, section: string, judul: string, deskripsi: string, kontak: string) => {
        try {
            await axios.put(API_ENDPOINTS.UPDATESECTION(id), { section, judul, deskripsi, kontak });
            toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Data berhasil diupdate', life: 3000 });
            fetchData();
        } catch (error) {
            console.error('Error updating data:', error);
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Gagal mengupdate data', life: 3000 });
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(API_ENDPOINTS.DELETESECTION(id));
            toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Data berhasil dihapus', life: 3000 });
            fetchData();
        } catch (error) {
            console.error('Error deleting data:', error);
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Gagal menghapus data', life: 3000 });
        }
    };

    return (
        <>
            <Toast ref={toast} />
            {isLoading ? (
                <div className="flex justify-content-center align-items-center">
                    <ProgressSpinner style={{ width: '20px', height: '20px' }} strokeWidth="7" fill="var(--surface-ground)" animationDuration=".5s" />
                </div>
            ) : (
                <DataTableWithCRUD
                    data={Section}
                    data4={Gambar}
                    loading={isLoading}
                    singleInput={false} // set false jika btuh 2 input
                    columns={[
                        { field: 'section', header: 'Section' },
                        { field: 'judul', header: 'Judul' },
                        { field: 'deskripsi', header: 'Deskripsi' },
                        { field: 'id_gambar', header: 'Id Gambar' },
                        { field: 'kontak', header: 'Kontak' }
                    ]}
                    onAdd={handleAdd}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                    nameField="section"
                    nameField2="judul"
                    nameField3="deskripsi"
                    nameField4="id_gambar"
                    nameField5="kontak"

                    inputLabel="Section"
                    inputLabel2="Judul"
                    inputLabel3="Deskripsi"
                    inputLabel4="Id Gambar"
                    inputLabel5="Kontak"
                />
            )}
        </>
    );
};

export default TambahSection;