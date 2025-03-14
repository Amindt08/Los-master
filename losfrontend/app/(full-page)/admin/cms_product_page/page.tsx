"use client"
import React, { useState, useEffect, useRef } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { Toast } from 'primereact/toast';
import TambahTopbar from './topbar/page';
import TambahGambarProduct from './image_product/page';
import TambahDeskripsi from './deskripsi/page';
import TambahTitleProduct from './title/page';
import TambahSidebar from './sidebar/page';

const TambahanAnalisaKredit = () => {
    const toast = useRef<Toast>(null);

    return (
        <div className="card">
            <h2 className='text-2xl font-bold mb-4'>CMS Product Page</h2>
            <TabView activeIndex={1}>
                <Toast ref={toast} />
                <TabPanel header="Tambah Topbar">
                    <TambahTopbar/>
                </TabPanel>
                <TabPanel header="Tambah Sidebar">
                    <TambahSidebar/>
                </TabPanel>
                <TabPanel header="Tambah Judul">
                    <TambahTitleProduct />
                </TabPanel>
                <TabPanel header="Tambah Gambar">
                    <TambahGambarProduct />
                </TabPanel>
                <TabPanel header="Tambah Deskripsi">
                    <TambahDeskripsi />
                </TabPanel>
            </TabView>
        </div>
    );
};

export default TambahanAnalisaKredit;