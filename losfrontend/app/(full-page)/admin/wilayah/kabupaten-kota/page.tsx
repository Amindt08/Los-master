import React, { useState, useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import axios from 'axios';
import { API_ENDPOINTS } from '@/app/api/losbackend/api';
import DataTableWithCRUD from '@/app/(full-page)/admin/component/datatable/page';
import { ProgressSpinner } from 'primereact/progressspinner';

const TambahKota = () => {
    const [RefKota, setRefKota] = useState([]);
    const [RefProvinsi, setRefProvinsi] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const toast = useRef<Toast>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const kotaResponse = await axios.get(API_ENDPOINTS.GETKOTA);
            setRefKota(kotaResponse.data);
            const provinsiResponse = await axios.get(API_ENDPOINTS.GETPROVINSI); //fetch data provinsi
            console.log(provinsiResponse.data);

            setRefProvinsi(provinsiResponse.data);
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Gagal mengambil data', life: 3000 });
        } finally {
            setIsLoading(false);
        }
    };

    const handleAdd = async (Keterangan: string, provinsi_id: string) => {
        try {
            //tambah provinsi_id 
            await axios.post(API_ENDPOINTS.TAMBAHKOTA, { Keterangan, provinsi_id });

            toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Kab/Kota berhasil ditambahkan', life: 3000 });
            fetchData();
        } catch (error) {
            console.error('Error adding data:', error);
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Gagal menambahkan data', life: 3000 });
        }
    };


    const handleUpdate = async (Kode: string, Keterangan: string, provinsi_id: string) => {
        try {

            await axios.put(API_ENDPOINTS.UPDATEKOTA(Kode), { Keterangan, provinsi_id });
            toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Kab/Kota berhasil diperbarui', life: 3000 });
            fetchData();
        } catch (error) {
            console.error('Error updating data:', error);
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Gagal mengupdate data', life: 3000 });
        }
    };


    const handleDelete = async (Kode: string) => {
        try {
            await axios.delete(API_ENDPOINTS.DELETEKOTA(Kode));
            toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Negara berhasil dihapus', life: 3000 });
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
                    data={RefKota}
                    data2={RefProvinsi} //data provinsi
                    loading={isLoading}
                    columns={[
                        { field: 'Keterangan', header: 'Kab/Kota' },
                    ]}
                    onAdd={handleAdd}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                    nameField="Keterangan"
                    nameField2="provinsi_id" //nama kolom dari data kota buat edit provinsi
                    inputLabel= "Kab/Kota"
                    inputLabel2= "Provinsi"
                    
                />
            )}
        </>
    );
};

export default TambahKota;