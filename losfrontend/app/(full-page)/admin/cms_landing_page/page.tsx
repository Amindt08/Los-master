"use client"
import React, { useState, useEffect, useRef } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { Toast } from 'primereact/toast';
import TambahNavbar from './navbar/page';
import TambahGambar from './image/page';
import TambahDeskripsi from './deskripsi/page';
import TambahTitle from './title/page';

const TambahanAnalisaKredit = () => {
    const toast = useRef<Toast>(null);

    return (
        <div className="card">
            <h2 className='text-2xl font-bold mb-4'>CMS Landing Page</h2>
            <TabView activeIndex={1}>
                <Toast ref={toast} />
                <TabPanel header="Tambah Navbar">
                    <TambahNavbar/>
                </TabPanel>
                <TabPanel header="Tambah Gambar">
                    <TambahGambar />
                </TabPanel>
                <TabPanel header="Tambah Deskripsi">
                    <TambahDeskripsi />
                </TabPanel>
                <TabPanel header="Tambah Judul">
                    <TambahTitle />
                </TabPanel>
            </TabView>
        </div>
    );
};

export default TambahanAnalisaKredit;