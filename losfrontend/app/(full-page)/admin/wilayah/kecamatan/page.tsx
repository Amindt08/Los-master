import React, { useState, useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import axios from 'axios';
import { API_ENDPOINTS } from '@/app/api/losbackend/api';
import DataTableWithCRUD from '@/app/(full-page)/admin/component/datatable/page';
import { ProgressSpinner } from 'primereact/progressspinner';

const TambahKec = () => {
    const [RefKec, setRefKec] = useState([]);
    const [RefKota, setRefKota] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const toast = useRef<Toast>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const kecResponse = await axios.get(API_ENDPOINTS.GETKEC);
            console.log("Data Kecamatan:", kecResponse.data); // Debugging
            setRefKec(kecResponse.data);

            const kotaResponse = await axios.get(API_ENDPOINTS.GETKOTA); //fetch data kota
            console.log("Data Kota:", kotaResponse.data); // Debugging
            setRefKota(kotaResponse.data);
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Gagal mengambil data', life: 3000 });
        } finally {
            setIsLoading(false);
        }
    };

    const handleAdd = async (Keterangan: string, kota_id: string) => {
        try {
            console.log("Mengirim data:", { Keterangan, kota_id }); // Debugging

            //tambah kota_id
            await axios.post(API_ENDPOINTS.TAMBAHKEC, { Keterangan, kota_id });

            toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Kecamatan berhasil ditambahkan', life: 3000 });
            fetchData();
        } catch (error) {
            console.error('Error adding data:', error);
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Gagal menambahkan data', life: 3000 });
        }
    };

    const handleUpdate = async (Kode: string, Keterangan: string, kota_id: string) => {
        try {
            await axios.put(API_ENDPOINTS.UPDATEKEC(Kode), { Keterangan, kota_id });
            toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Kecamatan berhasil diupdate', life: 3000 });
            fetchData();
        } catch (error) {
            console.error('Error updating data:', error);
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Gagal mengupdate data', life: 3000 });
        }
    };

    const handleDelete = async (Kode: string) => {
        try {
            await axios.delete(API_ENDPOINTS.DELETEKEC(Kode));
            toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Kecamatan berhasil dihapus', life: 3000 });
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
                    data={RefKec}
                    data2={RefKota} //data kota
                    loading={isLoading}
                    columns={[
                        { field: 'Keterangan', header: 'Kecamatan' }
                    ]}
                    onAdd={handleAdd}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                    nameField="Keterangan"
                    nameField2="kota_id"
                    inputLabel="Kecamatan"
                    inputLabel2="Kab/Kota"
                />
            )}
        </>
    );
};

export default TambahKec;