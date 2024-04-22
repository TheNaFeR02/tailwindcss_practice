import { pink } from "@mui/material/colors";
import Breadcrumb from "../../components/Breadcrumb";
import DefaultLayout from "../../layout/DefaultLayout";
import FormElements from "../Form/FormElements";
import React, { useState, useEffect, useRef } from "react";



import SignatureCanvas from 'react-signature-canvas';
import { IoCamera } from 'react-icons/io5';
import { MdOutlineCamera } from 'react-icons/md';
import { PiSignatureBold } from 'react-icons/pi';
import { HiPlusCircle } from 'react-icons/hi';
import { GrFormNextLink } from 'react-icons/gr';
import { MdOutlineNavigateNext } from 'react-icons/md';
// Opciones de Dropdown.
import departamentos_ciudades from "../../pages/Receptions/JSON/departamentos_ciudades.json";
import eps_list from "../../pages/Receptions/JSON/EPS.json";
import pension_fund from "../../pages/Receptions/JSON/pension_fund.json";
import arl from "../../pages/Receptions/JSON/arl.json";
import estratos from "../../pages/Receptions/JSON/estratos.json";
import zonas from "../../pages/Receptions/JSON/zona.json";
import escolaridades from "../../pages/Receptions/JSON/escolaridades.json";
import estados_civiles from "../../pages/Receptions/JSON/estados_civiles.json";
import grupos_sanguineos from "../../pages/Receptions/JSON/grupos_sanguineos.json";
import documentos_de_identidad from "../../pages/Receptions/JSON/documentos_de_identidad.json";
import generos from "../../pages/Receptions/JSON/generos.json";
import ocupaciones from "../../pages/Receptions/JSON/ocupaciones.json";
import tipos_de_evaluacion from "../../pages/Receptions/JSON/tipos_de_evaluacion.json";
import ciudades_de_atencion from "../../pages/Receptions/JSON/ciudades_de_atencion.json";
import cargos from "../../pages/Receptions/JSON/cargos.json";
import metodos_pago from "../../pages/Receptions/JSON/metodos_pago.json";
import PricingCard from "./PricingCard";
import ExamCard from "./ExamCard";


interface MissionCompany {
    id: number;
    name: string;
    tariffs: Tariff[];
}

interface Company {
    address: string;
    city: string;
    department: string;
    economy_activity: string;
    email: string;
    id: number;
    name: string;
    nit: string;
    observations: string;
    phone: string;
    short_name: string;
    mission_companies: MissionCompany[];
    tariffs: Tariff[];
}

interface Package {
    id: number;
    name: string;
    price: number;
}

interface Tariff {
    id: number;
    name: string;
    active: boolean;
}

interface Doctor {
    first_name: string;
    last_name: string;
}





const CreateReception = () => {
    const pageName = "Nueva Recepción";
    const newReception = "+ Nueva Recepción";
    const [activeTab, setActiveTab] = useState('patient');

    // Opciones de información del paciente.
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedStratum, setSelectedStratum] = useState('');
    const [selectedZone, setSelectedZone] = useState('');
    const [selectedScholarshipLevel, setScholarshipLevel] = useState('');
    const [selectedMaritalStatus, setMaritalStatus] = useState('');
    const [selectedBloodType, setBloodType] = useState('');
    const [selectedDocumentType, setDocumentType] = useState('');
    const [selectedGender, setGender] = useState('');
    const [job, setJob] = useState('');
    const [isCustomJob, setIsCustomJob] = useState<boolean>(false);
    const [medicalInsurance, setMedicalInsurance] = useState('');
    const [isCustomMedicalIns, setIsCustomMedicalIns] = useState<boolean>(false);
    const [pensionFund, setPensionFund] = useState<string>('');
    const [isCustomPensionFund, setIsCustomPensionFund] = useState<boolean>(false);
    const [ARL, setARL] = useState<string>('');
    const [isCustomARL, setIsCustomARL] = useState<boolean>(false);

    //opciones de información de la recepción.
    const [selectedEvaluationType, setEvaluationType] = useState('');
    const [selectedAppointmentCity, setAppointmentCity] = useState('');
    const [isCustomSection, setIsCustomSection] = useState(false);
    const [section, setSection] = useState('');

    const [companies, setCompanies] = useState<Company[]>([]);
    const [selectedCompany, setSelectedCompany] = useState('');
    const [selectedMissionCompany, setSelectedMissionCompany] = useState('');
    const [missionCompanies, setMissionCompanies] = useState<MissionCompany[]>([]);
    const [packages, setPackages] = useState<Package[]>([]);
    const [selectedPackage, setSelectedPackage] = useState(''); // if set to <string> the value={} gives an error.
    const [tariffs, setTariffs] = useState<Tariff[]>([]);
    const [selectedTariff, setSelectedTariff] = useState('');

    const [selectedPaymentType, setSelectedPaymentType] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    // const dpt_ciud = JSON.stringify(departamentos_ciudades);
    // console.log(dpt_ciud);

    const [selectedCity, setSelectedCity] = useState('');
    const [cities, setCities] = useState<string[]>([]);



    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    // const pictureRef = useRef<HTMLDivElement | null>(null);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
    const [showVideo, setShowVideo] = useState(false);
    const [image, setImage] = useState<string | null>(null);


    const sigCanvasRef = useRef<SignatureCanvas | null>(null);
    const [signature, setSignature] = useState<string | undefined>(undefined);



    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });

            if (videoRef.current) {
                videoRef.current.srcObject = stream;

                setVideoStream(stream);  // Store the video stream
            }
            setImage(null); // Clear captured image (if any)
            setShowVideo(true);
        } catch (err) {
            console.error("Error accessing the camera:", err);
        }
    };

    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext('2d');

            // Set canvas dimensions to match video
            canvasRef.current.width = videoRef.current.videoWidth;
            canvasRef.current.height = videoRef.current.videoHeight;

            // Draw current frame of video on canvas
            context?.drawImage(videoRef.current, 0, 0);

            // Retrieve the image data from canvas as a Data URL
            const dataURL = canvasRef.current.toDataURL('image/png');

            // If you have an image element to show the captured photo, you can set its 'src' attribute to the dataURL
            // imageRef.current.src = dataURL; 

            // For now, I'll assume you'll store the captured photo data URL in a state variable called 'image'
            setImage(dataURL); // setImage is a state setter, assuming you've useState for 'image'
        }
    };

    const newSignature = () => {
        if (!sigCanvasRef.current?.isEmpty()) {
            sigCanvasRef.current?.clear(); // Clear the signature board
        }
    }

    const saveSignature = () => {
        if (sigCanvasRef.current?.isEmpty()) {
            alert('Firma vacía. Por favor, firma antes de guardar.');
        } else {
            const signatureData = sigCanvasRef.current?.toDataURL();
            setSignature(signatureData);
            alert('Firma Guardada.');
        }
    };

    // Trae toda la lista de Empresas.
    useEffect(() => {
        // Fetch the CSRF token and store it in state
        fetch('http://127.0.0.1:8000/company/Company/', {
            method: 'GET',
            credentials: 'include',
        }).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    setCompanies(data);
                    // const allMissionCompanies = data.reduce((acc: MissionCompany[], company: Company) => {
                    //     return [...acc, ...company.mission_companies];
                    // }, []);
                    // console.log(allMissionCompanies);

                    // setMissionCompanies(allMissionCompanies);
                });
            }
        }).catch((error) => {
            console.error('Error fetching Company List data:', error);
        });
    }, []);

    // Muestra las Empresas en Misión de la Empresa Seleccionada.
    useEffect(() => {
        const company = companies.find(company => company.name === selectedCompany);
        if (company) {
            setMissionCompanies(company.mission_companies);
        } else {
            setMissionCompanies([]);
        }
    }, [selectedCompany]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/exam/Package/', {
            method: 'GET',
            credentials: 'include',
        }).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    setPackages(data);
                });
            }
        }).catch((error) => {
            console.error('Error fetching Package List data:', error);
        })
    }, []);


    //
    useEffect(() => {
        console.log(selectedMissionCompany);

        if (!selectedMissionCompany) {
            const company = companies.find(company => company.name === selectedCompany);
            if (company) {
                setTariffs(company.tariffs);
            } else {
                setTariffs([]);
            }
        } else {
            console.log("ENTROOO COSECHAS");

            const missionCompany = missionCompanies.find(missionCompany => missionCompany.name === selectedMissionCompany);
            console.log(missionCompany);

            if (missionCompany) {
                setTariffs(missionCompany.tariffs);
            } else {
                setTariffs([]);
            }
        }
    }, [selectedCompany, selectedMissionCompany]);

    //
    useEffect(() => {
        fetch('http://127.0.0.1:8000/auth/doctor-name-list/', {
            method: 'GET',
            credentials: 'include',
        }).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    setDoctors(data);
                });
            }
        }).catch((error) => {
            console.error('Error fetching Doctor Name List data:', error);
        })
    }, []);

    // update city dropdown whenever the department changes
    useEffect(() => {
        const department = departamentos_ciudades.find(dept => dept.departamento === selectedDepartment);
        if (department) {
            setCities(department.ciudades);
        } else {
            setCities([]);
        }
    }, [selectedDepartment]);

    // Fetch Medicos de la API
    useEffect(() => {

    }, []);

    return (
        <DefaultLayout>
            <Breadcrumb pageName={pageName} />

            <div className="flex flex-col justify-center ">
                <div className="border-gray-200 dark:border-gray-700 pb-3">
                    <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                        <li className="mr-2">
                            <a onClick={() => setActiveTab('patient')} className={`inline-flex p-4 border-b-2 hover:text-graydark hover:border-graydark dark:hover:border-white dark:hover:text-white group rounded-t-lg ${activeTab === 'patient' ? 'text-graydark border-graydark dark:text-white dark:border-white' : 'border-transparent '}`}
                                href="#"
                                aria-current={activeTab === 'patient' ? 'page' : undefined}
                            >
                                <svg aria-hidden="true" className="w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path></svg>Información del Paciente
                            </a>
                        </li>
                        <li className="mr-2">
                            <a onClick={() => setActiveTab('reception')}
                                href="#"
                                className={`inline-flex p-4 border-b-2 hover:text-graydark hover:border-graydark dark:hover:border-white dark:hover:text-white group rounded-t-lg ${activeTab === 'reception' ? 'text-graydark border-graydark dark:text-white dark:border-white' : 'border-transparent '}`}
                                aria-current={activeTab === 'reception' ? 'page' : undefined}
                            >
                                <svg aria-hidden="true" className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>Datos de la Recepción
                            </a>
                        </li>
                        <li className="mr-2">
                            <a onClick={() => setActiveTab('exams')}
                                href="#"
                                className={`inline-flex p-4 border-b-2 hover:text-graydark hover:border-graydark dark:hover:border-white dark:hover:text-white group rounded-t-lg ${activeTab === 'exams' ? 'text-graydark border-graydark dark:text-white dark:border-white' : 'border-transparent'}`}
                                aria-current={activeTab === 'exams' ? 'page' : undefined}
                            >
                                <svg aria-hidden="true" className="w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"></path></svg>Exámenes
                            </a>
                        </li>
                    </ul>
                </div>



                {activeTab === 'patient' && <div className="rounded-2xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Información del Paciente
                        </h3>
                    </div>

                    <div className="flex flex-wrap pr-2 pl-5 pt-5">

                        {/* <!-- Información del Paciente Start --> */}
                        <fieldset className="border border-solid border-stroke border-opacity-60 dark:border-graydark rounded-lg p-3 mb-5 w-full">
                            <legend className="text-sm opacity-60 dark:text-gray dark:opacity-40">Información de Identificación</legend>
                            <div className="flex flex-wrap gap-5.5 pb-5 pl-2.5">


                                <div className="mt-4 border-dashed border-2  w-50 h-50 ">

                                    <div className="picture flex justify-center items-center w-full h-full">
                                        {/* <div className="relative z-1 upload-file border-solid border-x border-y h-3 w-3"></div> */}
                                        {image && <img src={image} alt="Captured" />}
                                        {showVideo && !image && <video className="video" ref={videoRef} autoPlay></video>}
                                    </div>

                                    <div className="camera-options inline-flex">
                                        <div onClick={startCamera} className="start-camera pt-3  w-10 h-10 flex justify-center items-center"><IoCamera className="text-4xl" /></div>
                                        <div onClick={capturePhoto} className="capture-photo pt-3 w-10 h-10 flex justify-center items-center"><MdOutlineCamera className="text-3xl" /></div>
                                    </div>


                                    <canvas ref={canvasRef} className="hidden"></canvas> {/* This canvas can be hidden; it's just used to grab frames */}
                                </div>

                                <div className="signature self-end ">
                                    <div className="border-x border-y border-dotted  w-50 h-22">
                                        <SignatureCanvas
                                            ref={sigCanvasRef}
                                            canvasProps={{ className: 'signature-canvas w-full h-full' }}
                                        />
                                    </div>
                                    <div className="absolute signature-options inline-flex">
                                        <div onClick={newSignature} className="new-signature pt-3 w-10 h-10 flex justify-center items-center"><HiPlusCircle className="text-4xl" /></div>
                                        <div onClick={saveSignature} className="start-signature pt-3 w-10 h-10 flex justify-center items-center"><PiSignatureBold className="text-4xl" /></div>
                                    </div>
                                </div>

                                <div className="linebreak w-full"></div>

                                <div className="linebreak w-full"></div>

                                <div className="">
                                    <label className="mb-3 block text-black dark:text-white">
                                        Nombres
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Nombre Completo"
                                        className="w-100 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>
                                <div className="">
                                    <label className="mb-3 block text-black dark:text-white">
                                        Apellidos
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Apellidos"
                                        className="w-100 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>



                                <div className="linebreak w-full"></div>


                                <div className="h-21">
                                    <label className="mb-3 block text-black dark:text-white">
                                        Tipo de documento
                                    </label>
                                    <div className="h-13">
                                        <select
                                            value={selectedDocumentType}
                                            onChange={(e) => setDocumentType(e.target.value)}
                                            className="w-60 border-solid border-[1.5px]  border-stroke dark:border-form-strokedark  rounded-lg text-darkgray hover:bg-gray focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium px-5 py-3 h-12 text-sm  inline-flex items-center  dark:hover:bg-primary dark:focus:ring-blue-800 bg-transparent"
                                        >
                                            <option className="bg-white dark:bg-strokedark" value="">Seleccione un Tipo de Documento</option>
                                            {
                                                documentos_de_identidad.map((doc, index) => (
                                                    <option className="bg-white dark:bg-strokedark" key={index} value={doc.documento}>{doc.documento}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>

                                <div className="h-21">
                                    <label className="mb-3 block text-black dark:text-white">
                                        Documento
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Número de Documento"
                                        className="w-80  rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>

                                <div className="h-21">
                                    <label className="mb-3 block text-black dark:text-white">
                                        Género
                                    </label>
                                    <div className="h-13">
                                        <select
                                            value={selectedGender}
                                            onChange={(e) => setGender(e.target.value)}
                                            className="w-50 border-solid border-[1.5px]  border-stroke dark:border-form-strokedark  rounded-lg text-darkgray hover:bg-gray focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium px-5 py-3 h-12 text-sm  inline-flex items-center  dark:hover:bg-primary dark:focus:ring-blue-800 bg-transparent"
                                        >
                                            <option className="bg-white dark:bg-strokedark" value="">Género</option>
                                            {
                                                generos.map((gender, index) => (
                                                    <option className="bg-white dark:bg-strokedark" key={index} value={gender.genero}>{gender.genero}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>

                                <div className="linebreak w-full"></div>

                                <div>
                                    <label className="mb-3 block text-black dark:text-white">
                                        E-mail
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Correo Electrónico"
                                        className="w-100 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>

                                <div>
                                    <label className="mb-3 block text-black dark:text-white">
                                        Teléfono
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Teléfono/Celular"
                                        className="w-100 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>

                                <div className="linebreak w-full"></div>

                                <div>
                                    <label className="mb-3 block text-black dark:text-white">
                                        Fecha de Nacimiento
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            className="w-100 custom-input-date custom-input-date-1 rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-3 block text-black dark:text-white">
                                        Lugar de Nacimiento
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Ciudad de Nacimiento"
                                        className="w-100 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>
                            </div>
                        </fieldset>
                        {/* <!-- Información del Paciente End --> */}


                        <hr className="w-full pb-4 text-stroke border-opacity-60 dark:border-graydark" />


                        <fieldset className="border border-solid border-stroke border-opacity-60 dark:border-graydark rounded-lg p-3 mb-5">
                            <legend className="text-sm opacity-60 dark:text-gray dark:opacity-40">Información de Residencia</legend>
                            <div className="flex flex-wrap gap-5.5 pb-5 pl-2.5">
                                <div className="h-21">
                                    <label className="mb-3 block text-black dark:text-white">
                                        Departamento
                                    </label>
                                    <div className="h-13">
                                        <select
                                            value={selectedDepartment}
                                            onChange={(e) => setSelectedDepartment(e.target.value)}
                                            className="w-100 border-solid border-[1.5px]  border-stroke dark:border-form-strokedark  rounded-lg text-darkgray hover:bg-gray focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium px-5 py-3 h-12 text-sm  inline-flex items-center  dark:hover:bg-primary dark:focus:ring-blue-800 bg-transparent"
                                        >
                                            <option className="bg-white dark:bg-strokedark" value="">Seleccione un Departamento</option>
                                            {
                                                departamentos_ciudades.map((dept, index) => (
                                                    <option className="bg-white dark:bg-strokedark" key={index} value={dept.departamento}>{dept.departamento}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>

                                <div className="h-21">
                                    <label className="mb-3 block text-black dark:text-white">
                                        Ciudad
                                    </label>
                                    <div className="h-13">
                                        <select
                                            value={selectedCity}
                                            onChange={(e) => setSelectedCity(e.target.value)}
                                            className="w-100 border-solid border-[1.5px]  border-stroke dark:border-form-strokedark  rounded-lg text-darkgray hover:bg-gray focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium px-5 py-3 h-12 text-sm  inline-flex items-center  dark:hover:bg-primary dark:focus:ring-blue-800 bg-transparent"
                                        >
                                            <option className="bg-white dark:bg-strokedark" value="">Seleccione una Ciudad</option>
                                            {
                                                cities.map((city, index) => (
                                                    <option className="bg-white dark:bg-strokedark" key={index} value={city}>{city}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>

                                <div className="linebreak w-full"></div>

                                <div className="h-21">
                                    <label className="mb-3 block text-black dark:text-white">
                                        Estrato
                                    </label>
                                    <div className="h-13">
                                        <select
                                            value={selectedStratum}
                                            onChange={(e) => setSelectedStratum(e.target.value)}
                                            className="w-100 border-solid border-[1.5px]  border-stroke dark:border-form-strokedark  rounded-lg text-darkgray hover:bg-gray focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium px-5 py-3 h-12 text-sm  inline-flex items-center  dark:hover:bg-primary dark:focus:ring-blue-800 bg-transparent"
                                        >
                                            <option className="bg-white dark:bg-strokedark" value="">Seleccione un Estrato</option>
                                            {
                                                estratos.map((stratum, index) => (
                                                    <option className="bg-white dark:bg-strokedark" key={index} value={stratum.estrato}>{stratum.estrato}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>

                                <div className="h-21">
                                    <label className="mb-3 block text-black dark:text-white">
                                        Zona
                                    </label>
                                    <div className="h-13">
                                        <select
                                            value={selectedZone}
                                            onChange={(e) => setSelectedZone(e.target.value)}
                                            className="w-100 border-solid border-[1.5px]  border-stroke dark:border-form-strokedark  rounded-lg text-darkgray hover:bg-gray focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium px-5 py-3 h-12 text-sm  inline-flex items-center  dark:hover:bg-primary dark:focus:ring-blue-800 bg-transparent"
                                        >
                                            <option className="bg-white dark:bg-strokedark" value="">Seleccione una Zona</option>
                                            {
                                                zonas.map((zone, index) => (
                                                    <option className="bg-white dark:bg-strokedark" key={index} value={zone.zona}>{zone.zona}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>

                            </div>
                        </fieldset >


                        <hr className="w-full pb-4 text-stroke border-opacity-60 dark:border-graydark" />


                        {/* información Personal Start */}
                        <fieldset className="border border-solid border-stroke border-opacity-60 dark:border-graydark rounded-lg p-3 mb-5">
                            <legend className="text-sm opacity-60 dark:text-gray dark:opacity-40">Información Personal</legend>
                            <div className="flex flex-wrap gap-5.5 pb-5 pl-2.5">
                                <div>
                                    <label className="mb-3 block text-black dark:text-white">
                                        Dependientes
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Número de personas a cargo"
                                        className="w-100 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                </div>

                                <div className="h-21">
                                    <label className="mb-3 block text-black dark:text-white">
                                        Escolaridad
                                    </label>
                                    <div className="h-13">
                                        <select
                                            value={selectedScholarshipLevel} // Escolaridad
                                            onChange={(e) => setScholarshipLevel(e.target.value)}
                                            className="w-100 border-solid border-[1.5px]  border-stroke dark:border-form-strokedark  rounded-lg text-darkgray hover:bg-gray focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium px-5 py-3 h-12 text-sm  inline-flex items-center  dark:hover:bg-primary dark:focus:ring-blue-800 bg-transparent"
                                        >
                                            <option className="bg-white dark:bg-strokedark" value="">Seleccione una Escolaridad</option>
                                            {
                                                escolaridades.map((escolaridad, index) => (
                                                    <option className="bg-white dark:bg-strokedark" key={index} value={escolaridad.escolaridad}>{escolaridad.escolaridad}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>

                                <div className="linebreak w-full"></div>

                                <div className="h-21 z-20">
                                    <label className="mb-3 block text-black dark:text-white">
                                        Estado Civil
                                    </label>
                                    <div className="h-13">
                                        <select
                                            value={selectedMaritalStatus} // Escolaridad
                                            onChange={(e) => setMaritalStatus(e.target.value)}
                                            className="w-100 border-solid border-[1.5px]  border-stroke dark:border-form-strokedark  rounded-lg text-darkgray hover:bg-gray focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium px-5 py-3 h-12 text-sm  inline-flex items-center  dark:hover:bg-primary dark:focus:ring-blue-800 bg-transparent"
                                        >
                                            <option className="bg-white dark:bg-strokedark" value="">Seleccione un Estado Civil</option>
                                            {
                                                estados_civiles.map((estado_civil, index) => (
                                                    <option className="bg-white dark:bg-strokedark" key={index} value={estado_civil.estado_civil}>{estado_civil.estado_civil}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>

                                <div className="h-21">
                                    <label className="mb-3 block text-black dark:text-white">
                                        Grupo Sanguíneo
                                    </label>
                                    <div className="h-13">
                                        <select
                                            value={selectedBloodType} // Escolaridad
                                            onChange={(e) => setBloodType(e.target.value)}
                                            className="w-100 border-solid border-[1.5px]  border-stroke dark:border-form-strokedark  rounded-lg text-darkgray hover:bg-gray focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium px-5 py-3 h-12 text-sm  inline-flex items-center  dark:hover:bg-primary dark:focus:ring-blue-800 bg-transparent"
                                        >
                                            <option className="bg-white dark:bg-strokedark" value="">Seleccione un Grupo Sanguíneo</option>
                                            {
                                                grupos_sanguineos.map((blood_type, index) => (
                                                    <option className="bg-white dark:bg-strokedark" key={index} value={blood_type.grupo_sanguineo}>{blood_type.grupo_sanguineo}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>

                                <div className="linebreak w-full"></div>

                                <div className="h-21">
                                    <label className="mb-3 block text-black dark:text-white">
                                        EPS
                                    </label>
                                    <div className="h-13">
                                        {!isCustomMedicalIns ? (
                                            <select
                                                value={medicalInsurance}
                                                onChange={(e) => {
                                                    if (e.target.value === 'Otro (Escribir una nueva EPS)') {
                                                        setIsCustomMedicalIns(true);
                                                        setMedicalInsurance('');
                                                    } else {
                                                        setMedicalInsurance(e.target.value);
                                                    }
                                                }}
                                                className="w-100 border-solid border-[1.5px]  border-stroke dark:border-form-strokedark  rounded-lg text-darkgray hover:bg-gray focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium px-5 py-3 h-12 text-sm  inline-flex items-center  dark:hover:bg-primary dark:focus:ring-blue-800 bg-transparent"
                                            >
                                                <option className="bg-white dark:bg-strokedark" value="">Seleccione una EPS</option>
                                                {
                                                    eps_list.map((eps, index) => (
                                                        <option className="bg-white dark:bg-strokedark" key={index} value={eps.name}>{eps.name}</option>
                                                    ))

                                                }
                                                {/* <option value=""></option> */}
                                            </select>
                                        ) : (
                                            <input
                                                value={medicalInsurance}
                                                onChange={(e) => setMedicalInsurance(e.target.value)}
                                                onBlur={() => {
                                                    if (medicalInsurance === '') {
                                                        setIsCustomMedicalIns(false);
                                                    }
                                                }}
                                                className="w-100 border-solid border-[1.5px] border-stroke dark:border-form-strokedark rounded-lg text-darkgray hover:bg-gray focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium px-5 py-3 h-12 text-sm inline-flex items-center dark:hover:bg-primary dark:focus:ring-blue-800 bg-transparent"
                                                placeholder="Escriba su EPS"
                                            />
                                        )}

                                    </div>
                                </div>

                                <div className="h-21">
                                    <label className="mb-3 block text-black dark:text-white">
                                        Fondo de Pensiones
                                    </label>
                                    <div className="h-13">
                                        {!isCustomPensionFund ? (
                                            <select
                                                value={pensionFund}
                                                onChange={(e) => {
                                                    if (e.target.value === 'Otro (Escribir uno nuevo)') {
                                                        setIsCustomPensionFund(true);
                                                        setPensionFund('');
                                                    } else {
                                                        setPensionFund(e.target.value);
                                                    }
                                                }}
                                                className="w-100 border-solid border-[1.5px]  border-stroke dark:border-form-strokedark  rounded-lg text-darkgray hover:bg-gray focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium px-5 py-3 h-12 text-sm  inline-flex items-center  dark:hover:bg-primary dark:focus:ring-blue-800 bg-transparent"
                                            >
                                                <option className="bg-white dark:bg-strokedark" value="">Seleccione un fondo de pensiones</option>
                                                {
                                                    pension_fund.map((pf, index) => (
                                                        <option className="bg-white dark:bg-strokedark" key={index} value={pf.name}>{pf.name}</option>
                                                    ))

                                                }
                                            </select>
                                        ) : (
                                            <input
                                                value={pensionFund}
                                                onChange={(e) => setPensionFund(e.target.value)}
                                                onBlur={() => {
                                                    if (pensionFund === '') {
                                                        setIsCustomPensionFund(false);
                                                    }
                                                }}
                                                className="w-100 border-solid border-[1.5px] border-stroke dark:border-form-strokedark rounded-lg text-darkgray hover:bg-gray focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium px-5 py-3 h-12 text-sm inline-flex items-center dark:hover:bg-primary dark:focus:ring-blue-800 bg-transparent"
                                                placeholder="Escriba su fondo de pensiones"
                                            />
                                        )}

                                    </div>
                                </div>

                                <div className="linebreak w-full"></div>

                                <div className="h-21">
                                    <label className="mb-3 block text-black dark:text-white">
                                        ARL (Riesgos Laborales)
                                    </label>
                                    <div className="h-13">
                                        {!isCustomARL ? (
                                            <select
                                                value={ARL}
                                                onChange={(e) => {
                                                    if (e.target.value === 'Otro (Escribir uno nuevo)') {
                                                        setIsCustomARL(true);
                                                        setARL('');
                                                    } else {
                                                        setARL(e.target.value);
                                                    }
                                                }}
                                                className="w-100 border-solid border-[1.5px]  border-stroke dark:border-form-strokedark  rounded-lg text-darkgray hover:bg-gray focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium px-5 py-3 h-12 text-sm  inline-flex items-center  dark:hover:bg-primary dark:focus:ring-blue-800 bg-transparent"
                                            >
                                                <option className="bg-white dark:bg-strokedark" value="">Seleccione una ARL</option>
                                                {
                                                    arl.map((arl, index) => (
                                                        <option className="bg-white dark:bg-strokedark" key={index} value={arl.name}>{arl.name}</option>
                                                    ))

                                                }
                                            </select>
                                        ) : (
                                            <input
                                                value={ARL}
                                                onChange={(e) => setARL(e.target.value)}
                                                onBlur={() => {
                                                    if (ARL === '') {
                                                        setIsCustomARL(false);
                                                    }
                                                }}
                                                className="w-100 border-solid border-[1.5px] border-stroke dark:border-form-strokedark rounded-lg text-darkgray hover:bg-gray focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium px-5 py-3 h-12 text-sm inline-flex items-center dark:hover:bg-primary dark:focus:ring-blue-800 bg-transparent"
                                                placeholder="Escriba su ARL"
                                            />
                                        )}

                                    </div>
                                </div>

                                <div className="h-21">
                                    <label className="mb-3 block text-black dark:text-white">
                                        Ocupación
                                    </label>
                                    <div className="h-13">
                                        {!isCustomJob ? (
                                            <select
                                                value={job}
                                                onChange={(e) => {
                                                    if (e.target.value === 'Otro (Escribir uno nuevo)') {
                                                        setIsCustomJob(true);
                                                        setJob('');
                                                    } else {
                                                        setJob(e.target.value);
                                                    }
                                                }}
                                                className="w-100 border-solid border-[1.5px]  border-stroke dark:border-form-strokedark  rounded-lg text-darkgray hover:bg-gray focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium px-5 py-3 h-12 text-sm  inline-flex items-center  dark:hover:bg-primary dark:focus:ring-blue-800 bg-transparent"
                                            >
                                                <option className="bg-white dark:bg-strokedark" value="">Seleccione una Ocupación</option>
                                                {
                                                    ocupaciones.map((job, index) => (
                                                        <option className="bg-white dark:bg-strokedark" key={index} value={job.ocupacion}>{job.ocupacion}</option>
                                                    ))

                                                }
                                            </select>
                                        ) : (
                                            <input
                                                value={job}
                                                onChange={(e) => setJob(e.target.value)}
                                                onBlur={() => {
                                                    if (job === '') {
                                                        setIsCustomJob(false);
                                                    }
                                                }}
                                                className="w-100 border-solid border-[1.5px] border-stroke dark:border-form-strokedark rounded-lg text-darkgray hover:bg-gray focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium px-5 py-3 h-12 text-sm inline-flex items-center dark:hover:bg-primary dark:focus:ring-blue-800 bg-transparent"
                                                placeholder="Escriba su Ocupación"
                                            />
                                        )}

                                    </div>
                                </div>

                                <div className="linebreak w-full"></div>

                                <div className="h-21">
                                    <label className="mb-3 block text-black dark:text-white">
                                        Cargo
                                    </label>
                                    <div className="h-13">
                                        {!isCustomSection ? (
                                            <select
                                                value={section}
                                                onChange={(e) => {
                                                    if (e.target.value === 'Otro (Escribir uno nuevo)') {
                                                        setIsCustomSection(true);
                                                        setSection('');
                                                    } else {
                                                        setSection(e.target.value);
                                                    }
                                                }}
                                                className="w-100 border-solid border-[1.5px] border-stroke dark:border-form-strokedark rounded-lg text-darkgray hover:bg-gray focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium px-5 py-3 h-12 text-sm inline-flex items-center dark:hover:bg-primary dark:focus:ring-blue-800 bg-transparent"
                                            >
                                                <option className="bg-white dark:bg-strokedark" value="">Seleccione un Cargo</option>
                                                {
                                                    cargos.map((cargo, index) => (
                                                        <option className="bg-white dark:bg-strokedark" key={index} value={cargo.cargo}>{cargo.cargo}</option>
                                                    ))
                                                }
                                            </select>
                                        ) : (
                                            <input
                                                value={section}
                                                onChange={(e) => setSection(e.target.value)}
                                                onBlur={() => {
                                                    if (section === '') {
                                                        setIsCustomSection(false);
                                                    }
                                                }}
                                                className="w-100 border-solid border-[1.5px] border-stroke dark:border-form-strokedark rounded-lg text-darkgray hover:bg-gray focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium px-5 py-3 h-12 text-sm inline-flex items-center dark:hover:bg-primary dark:focus:ring-blue-800 bg-transparent"
                                                placeholder="Escriba su Cargo"
                                            />
                                        )}
                                    </div>
                                </div>


                            </div>
                        </fieldset>
                        {/* Información Personal End */}




                    </div>

                </div>}
                {activeTab === 'reception' && <div className="rounded-2xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Datos de la Recepción
                        </h3>
                    </div>

                    <div className="flex flex-wrap pr-2 pl-5 pt-5">

                        <fieldset className="border border-solid border-stroke border-opacity-60 dark:border-graydark rounded-lg p-3 mb-5 w-full">
                            <legend className="text-sm opacity-60 dark:text-gray dark:opacity-40">Información General</legend>
                            <div className="flex flex-wrap gap-5.5 pb-5 pl-2.5">
                                <div className="h-21">
                                    <label className="mb-3 block text-black dark:text-white">
                                        Tipo de Evaluación
                                    </label>
                                    <div className="h-13">
                                        <select
                                            value={selectedEvaluationType}
                                            onChange={(e) => setEvaluationType(e.target.value)}
                                            className="w-80 border-solid border-[1.5px]  border-stroke dark:border-form-strokedark  rounded-lg text-darkgray hover:bg-gray focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium px-5 py-3 h-12 text-sm  inline-flex items-center  dark:hover:bg-primary dark:focus:ring-blue-800 bg-transparent"
                                        >
                                            <option className="bg-white dark:bg-strokedark" value="">Seleccione un Tipo de Evaluación</option>
                                            {
                                                tipos_de_evaluacion.map((evalu, index) => (
                                                    <option className="bg-white dark:bg-strokedark" key={index} value={evalu.tipo_evaluacion}>{evalu.tipo_evaluacion}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>

                                <div className="h-21">
                                    <label className="mb-3 block text-black dark:text-white">
                                        Ciudad de Atención
                                    </label>
                                    <div className="h-13">
                                        <select
                                            value={selectedAppointmentCity}
                                            onChange={(e) => setAppointmentCity(e.target.value)}
                                            className="w-80 border-solid border-[1.5px]  border-stroke dark:border-form-strokedark  rounded-lg text-darkgray hover:bg-gray focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium px-5 py-3 h-12 text-sm  inline-flex items-center  dark:hover:bg-primary dark:focus:ring-blue-800 bg-transparent"
                                        >
                                            <option className="bg-white dark:bg-strokedark" value="">Seleccione la Ciudad de Atención</option>
                                            {
                                                ciudades_de_atencion.map((city, index) => (
                                                    <option className="bg-white dark:bg-strokedark" key={index} value={city.ciudad}>{city.ciudad}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>

                                <div className="linebreak w-full"></div>

                                <div className="h-21">
                                    <label className="mb-3 block text-black dark:text-white">
                                        Médico
                                    </label>
                                    <div className="h-13">
                                        <select
                                            value={selectedDoctor}
                                            onChange={(e) => setSelectedDoctor(e.target.value)}
                                            className="w-80 border-solid border-[1.5px]  border-stroke dark:border-form-strokedark  rounded-lg text-darkgray hover:bg-gray focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium px-5 py-3 h-12 text-sm  inline-flex items-center  dark:hover:bg-primary dark:focus:ring-blue-800 bg-transparent"
                                        >
                                            <option className="bg-white dark:bg-strokedark" value="">Seleccione el Médico</option>
                                            {
                                                doctors.map((doctor, index) => (
                                                    <option className="bg-white dark:bg-strokedark" key={index} value={doctor.first_name + doctor.last_name}>{"Dr. " + doctor.first_name + " " + doctor.last_name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </fieldset>

                        <hr className="w-full pb-4 text-stroke border-opacity-60 dark:border-graydark" />

                        <fieldset className="border border-solid border-stroke border-opacity-60 dark:border-graydark rounded-lg p-3 mb-5 w-full">
                            <legend className="text-sm opacity-60 dark:text-gray dark:opacity-40">Detalles de la Empresa</legend>
                            <div className="flex flex-wrap gap-5.5 pb-5 pl-2.5">
                                <div className="h-21">
                                    <label className="mb-3 block text-black dark:text-white">
                                        Empresa
                                    </label>
                                    <div className="h-13">
                                        <select
                                            value={selectedCompany}
                                            onChange={(e) => setSelectedCompany(e.target.value)}
                                            className="w-80 border-solid border-[1.5px]  border-stroke dark:border-form-strokedark  rounded-lg text-darkgray hover:bg-gray focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium px-5 py-3 h-12 text-sm  inline-flex items-center  dark:hover:bg-primary dark:focus:ring-blue-800 bg-transparent"
                                        >
                                            <option className="bg-white dark:bg-strokedark" value="">Seleccione la Empresa</option>
                                            {
                                                companies.map((company, index) => (
                                                    <option className="bg-white dark:bg-strokedark" key={index} value={company.name}>{company.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>

                                <div className="h-21">
                                    <label className="mb-3 block text-black dark:text-white">
                                        Empresas en Misión
                                    </label>
                                    <div className="h-13">
                                        <select
                                            value={selectedMissionCompany}
                                            onChange={(e) => setSelectedMissionCompany(e.target.value)}
                                            className="w-80 border-solid border-[1.5px]  border-stroke dark:border-form-strokedark  rounded-lg text-darkgray hover:bg-gray focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium px-5 py-3 h-12 text-sm  inline-flex items-center  dark:hover:bg-primary dark:focus:ring-blue-800 bg-transparent"
                                        >
                                            <option className="bg-white dark:bg-strokedark" value="">Seleccione la Empresa en Misión</option>
                                            {
                                                missionCompanies.map((companyMission, index) => (
                                                    <option className="bg-white dark:bg-strokedark" key={index} value={companyMission.name}>{companyMission.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </fieldset>

                        <hr className="w-full pb-4 text-stroke border-opacity-60 dark:border-graydark" />

                        <fieldset className="border border-solid border-stroke border-opacity-60 dark:border-graydark rounded-lg p-3 mb-5 w-full">
                            <legend className="text-sm opacity-60 dark:text-gray dark:opacity-40">Detalles de Pago</legend>
                            <div className="flex flex-wrap gap-5.5 pb-5 pl-2.5">
                                <div className="h-21">
                                    <label className="mb-3 block text-black dark:text-white">
                                        Paquetes
                                    </label>
                                    <div className="h-13">
                                        <select
                                            value={selectedPackage}
                                            onChange={(e) => setSelectedPackage(e.target.value)}
                                            className="w-80 border-solid border-[1.5px]  border-stroke dark:border-form-strokedark  rounded-lg text-darkgray hover:bg-gray focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium px-5 py-3 h-12 text-sm  inline-flex items-center  dark:hover:bg-primary dark:focus:ring-blue-800 bg-transparent"
                                        >
                                            <option className="bg-white dark:bg-strokedark" value="">Seleccione el Paquete</option>
                                            {
                                                packages.map((packa: Package, index: number) => (
                                                    <option className="bg-white dark:bg-strokedark" key={index} value={packa.name}>{packa.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>

                                <div className="h-21">
                                    <label className="mb-3 block text-black dark:text-white">
                                        Tarifarios
                                    </label>
                                    <div className="h-13">
                                        <select
                                            value={selectedTariff}
                                            onChange={(e) => setSelectedTariff(e.target.value)}
                                            className="w-80 border-solid border-[1.5px]  border-stroke dark:border-form-strokedark  rounded-lg text-darkgray hover:bg-gray focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium px-5 py-3 h-12 text-sm  inline-flex items-center  dark:hover:bg-primary dark:focus:ring-blue-800 bg-transparent"
                                        >
                                            <option className="bg-white dark:bg-strokedark" value="">Seleccione el Tarifario</option>
                                            {
                                                tariffs.map((tariff: Tariff, index: number) => (
                                                    <option className="bg-white dark:bg-strokedark" key={index} value={tariff.name}>{tariff.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>

                                <div className="linebreak w-full"></div>

                                <div className="h-21">
                                    <label className="mb-3 block text-black dark:text-white">
                                        Método de Pago
                                    </label>
                                    <div className="h-13">
                                        <select
                                            value={selectedPaymentType}
                                            onChange={(e) => setSelectedPaymentType(e.target.value)}
                                            className="w-80 border-solid border-[1.5px]  border-stroke dark:border-form-strokedark  rounded-lg text-darkgray hover:bg-gray focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium px-5 py-3 h-12 text-sm  inline-flex items-center  dark:hover:bg-primary dark:focus:ring-blue-800 bg-transparent"
                                        >
                                            <option className="bg-white dark:bg-strokedark" value="">Seleccione un Método de Pago </option>
                                            {
                                                metodos_pago.map((pago, index: number) => (
                                                    <option className="bg-white dark:bg-strokedark" key={index} value={pago.metodo_pago}>{pago.metodo_pago}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </fieldset>

                        <hr className="w-full pb-4 text-stroke border-opacity-60 dark:border-graydark" />

                        <fieldset className="border border-solid border-stroke border-opacity-60 dark:border-graydark rounded-lg p-3 mb-5 w-full">
                            <legend className="text-sm opacity-60 dark:text-gray dark:opacity-40">Observaciones</legend>
                            <div className="">
                                <label className="mb-3 block text-black dark:text-white">
                                    Comentarios
                                </label>
                                <textarea
                                    placeholder="Ingresa un comentario"
                                    className="w-1/3 h-50 resize-none  rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>
                        </fieldset>
                    </div>
                </div>}
                {activeTab === 'exams' && <div className="rounded-2xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Exámenes
                        </h3>
                    </div>

                    <div className="flex flex-wrap gap-3 pr-2 pl-5 pt-5 pb-5">
                        <ExamCard name="Audiometría" />
                        <ExamCard name="Visiometría" />
                        <ExamCard name="Optometría" />
                        <ExamCard name="Audiometría" />
                        <ExamCard name="Audiometría" />
                        <ExamCard name="Audiometría" />
                        <ExamCard name="Audiometría" />
                        <ExamCard name="Audiometría" />
                        <ExamCard name="Audiometría" />
                        <ExamCard name="Audiometría" />
                        <ExamCard name="Audiometría" />
                        <ExamCard name="Audiometría" />
                        <ExamCard name="Audiometría" />
                        <ExamCard name="Audiometría" />
                        <ExamCard name="Audiometría" />
                        <ExamCard name="Audiometría" />
                        <ExamCard name="Audiometría" />
                        <ExamCard name="Audiometría" />
                        <ExamCard name="Audiometría" />
                        <ExamCard name="Audiometría" />
                        <ExamCard name="Audiometría" />
                        <ExamCard name="Audiometría" />
                        <ExamCard name="Audiometría" />
                        <ExamCard name="Audiometría" />
                        <ExamCard name="Audiometría" />
                        <ExamCard name="Audiometría" />
                        <ExamCard name="Audiometría" />
                        <ExamCard name="Audiometría" />
                        <ExamCard name="Audiometría" />
                        <ExamCard name="Audiometría" />
                        <ExamCard name="Audiometría" />
                        <ExamCard name="Audiometría" />

                        {/* <div className="">
                            <PricingCard />
                        </div> */}



                    </div>
                </div>}

                {/* Next Button start */}
                {activeTab === 'patient' &&
                    <button
                        onClick={() => setActiveTab('reception')}
                        className="shadow-xl hover:bg-secondary duration-100  font-bold text-xl mr-15  px-15 py-3  md:mt-12 text-white  bg-primary rounded-lg w-100 self-end"
                    >
                        Datos de la Recepción
                        <MdOutlineNavigateNext className="text-white inline-block text-4xl" />
                    </button>}

                {activeTab === 'reception' &&
                    <button
                        onClick={() => setActiveTab('exams')}
                        className="shadow-xl hover:bg-secondary duration-100  font-bold text-xl mr-15  px-15 py-3  md:mt-12 text-white  bg-primary rounded-lg w-100 self-end"
                    >
                        Exámenes
                        <MdOutlineNavigateNext className="text-white inline-block text-4xl" />
                    </button>}

                {activeTab === 'exams' &&
                    <button
                        onClick={() => setActiveTab('exams')}
                        className="shadow-xl hover:bg-secondary duration-100  font-bold text-xl mr-15  px-15 py-3  md:mt-12 text-white  bg-primary rounded-lg w-100 self-end"
                    >
                        Guardar Paciente
                        <MdOutlineNavigateNext className="text-white inline-block text-4xl" />
                    </button>
                }
                {/* Next Button start */}


            </div>





        </DefaultLayout>
    );

};

export default CreateReception;