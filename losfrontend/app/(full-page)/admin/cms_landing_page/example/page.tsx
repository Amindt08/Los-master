import React, { useState, useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import axios from 'axios';
import { API_ENDPOINTS } from '@/app/api/losbackend/api';
import DataTableWithCRUD from '@/app/(full-page)/admin/component/datatable3/page';
import { ProgressSpinner } from 'primereact/progressspinner';

const TambahData = () => {
    const [Navbar, setNavbar] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const toast = useRef<Toast>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(API_ENDPOINTS.GETNAVBARLANDING);
            setNavbar(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Gagal mengambil data', life: 3000 });
        } finally {
            setIsLoading(false);
        }
    };

    const handleAdd = async (kode_navbar: string, nama: string, link_to: string) => {
        console.log("Data yang dikirim ke backend:", { kode_navbar, nama, link_to });
    
        try {
            await axios.post(API_ENDPOINTS.TAMBAHNAVBARLANDING, { kode_navbar, nama, link_to });
            toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Data berhasil ditambahkan', life: 3000 });
            fetchData();
        } catch (error) {
            console.error('Error adding data:', error);
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Gagal menambahkan data', life: 3000 });
        }
    };
    
    const handleUpdate = async (id: number, updatedData: { kode_navbar: string; nama: string; link_to: string }) => {
        try {
            await axios.put(API_ENDPOINTS.UPDATENAVBARLANDING(String(id)), updatedData);
            toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Data berhasil diperbarui', life: 3000 });
            fetchData();
        } catch (error) {
            console.error('Error updating data:', error);
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Gagal memperbarui data', life: 3000 });
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(API_ENDPOINTS.DELETENAVBARLANDING(String(id)));
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
                <div className="flex justify-center items-center">
                    <ProgressSpinner 
                        style={{ width: '50px', height: '50px' }} 
                        strokeWidth="5" 
                        fill="var(--surface-ground)" 
                        animationDuration=".5s" 
                    />
                </div>
            ) : (
                <DataTableWithCRUD
                    data={Navbar}
                    onAdd={handleAdd}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                    singleInput={true} // set false jika btuh 2 input
                    columns={[
                        { field: 'id', header: 'ID' },
                        { field: 'kode_navbar', header: 'Kode Navbar' },
                        { field: 'nama', header: 'Nama' },
                        { field: 'link_to', header: 'Link' }
                    ]}
                    idField="id"
                    additionalFields={[
                        { field: 'kode_navbar', label: 'Kode Navbar' },
                        { field: 'nama', label: 'Nama' },
                        { field: 'link_to', label: 'Link' }
                    ]}
                    inputLabel="ID"
                    inputLabel2="Kode Navbar"
                    inputLabel3="Label"
                    inputLabel5="Path"
                />
            )}
        </>
    );
};

export default TambahData;
