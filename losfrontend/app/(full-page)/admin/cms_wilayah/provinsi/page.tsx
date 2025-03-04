import React, { useState, useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import axios from 'axios';
import { API_ENDPOINTS } from '@/app/api/losbackend/api';
import DataTableWithCRUD from '@/app/(full-page)/admin/component/datatable/page';
import { ProgressSpinner } from 'primereact/progressspinner';

const TambahProvinsi = () => {
    const [RefProvinsi, setRefProvinsi] = useState([]);
    const [RefNegara, setRefNegara] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const toast = useRef<Toast>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const provinsiResponse = await axios.get(API_ENDPOINTS.GETPROVINSI);
            setRefProvinsi(provinsiResponse.data);
            const negaraResponse = await axios.get(API_ENDPOINTS.GETNEGARA); 
            console.log(negaraResponse.data);
            
            setRefNegara(negaraResponse.data);
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Gagal mengambil data', life: 3000 });
        } finally {
            setIsLoading(false);
        }
    };

    const handleAdd = async (Keterangan: string, negara_id: string) => {
        try {
            //tambah negara_id
            await axios.post(API_ENDPOINTS.TAMBAHPROVINSI, { Keterangan, negara_id });

            toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Provinsi berhasil ditambahkan', life: 3000 });
            fetchData();
        } catch (error) {
            console.error('Error adding data:', error);
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Gagal menambahkan data', life: 3000 });
        }
    };

    const handleUpdate = async (Kode: string, Keterangan: string, negara_id: string) => {
        try {
            await axios.put(API_ENDPOINTS.UPDATEPROVINSI(Kode), { Keterangan, negara_id });
            toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Provinsi berhasil diupdate', life: 3000 });
            fetchData();
        } catch (error) {
            console.error('Error updating data:', error);
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Gagal mengupdate data', life: 3000 });
        }
    };

    const handleDelete = async (Kode: string) => {
        try {
            await axios.delete(API_ENDPOINTS.DELETEPROVINSI(Kode));
            toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Provinsi berhasil dihapus', life: 3000 });
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
                    data={RefProvinsi}
                    data2={RefNegara}
                    loading={isLoading}
                    columns={[
                        { field: 'Keterangan', header: 'Provinsi' }
                    ]}
                    onAdd={handleAdd}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                    nameField="Keterangan"
                    nameField2="negara_id"
                    inputLabel="Provinsi"
                    inputLabel2="Negara"
                />
            )}
        </>
    );
};

export default TambahProvinsi;