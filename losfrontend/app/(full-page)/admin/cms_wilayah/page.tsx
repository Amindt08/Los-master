"use client"
import React, { useState, useEffect, useRef } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { Toast } from 'primereact/toast';
import axios from 'axios';
import { API_ENDPOINTS } from '@/app/api/losbackend/api';
import DataTableWithCRUD from '@/app/(full-page)/admin/component/datatable/page'; // Pastikan path ini benar
import { ProgressSpinner } from 'primereact/progressspinner';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import TambahNegara from './negara/page';
import TambahKecamatan from './kecamatan/page';
import TambahProvinsi from './provinsi/page';
import TambahKota from './kabupaten-kota/page';
import TambahKelurahan from './kelurahan/page';
import TambahKodePos from './kodepos/page'

const Wilayah = () => {
    const toast = useRef<Toast>(null);

    return (
        <div className="card">
            <h2 className='text-2xl font-bold mb-4'>CMS Data Wilayah</h2>
            <TabView activeIndex={1}>
                <Toast ref={toast} />
                <TabPanel header="Tambah Negara">
                    <TambahNegara />
                </TabPanel>
                <TabPanel header="Tambah Provinsi">
                    <TambahProvinsi />
                </TabPanel>
                <TabPanel header="Tambah Kota">
                    <TambahKota />
                </TabPanel>
                <TabPanel header="Tambah Kecamatan">
                    <TambahKecamatan />
                </TabPanel>
                <TabPanel header="Tambah Kelurahan">
                    <TambahKelurahan />
                </TabPanel>
                <TabPanel header="Tambah Kode Pos">
                    <TambahKodePos />
                </TabPanel>
            </TabView>
        </div>
    );
};

export default Wilayah;