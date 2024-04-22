// import { PlusIcon } from '@heroicons/react/outline' // to replace AddTwoToneIcon
import { useNavigate } from 'react-router-dom';

interface PageHeaderProps {
  Pagename: string;
  newElement?: string;
}

function PageHeader({ Pagename, newElement }: PageHeaderProps) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/recepcion/nueva");
  };

  const user = {
    name: 'Catherine Pike'
  };
  return (
    <div className="bg-white rounded-sm border-stroke shadow-default dark:border-strokedark dark:bg-boxdark pt-6 pl-4 ">
      <div className="mx-auto max-w-screen-2xl 2xl:pt-4 md:p-6 2xl:p-0 xl:pb-2">
        <div className=" flex justify-between items-center mb-15">
          <div className="mx-auto ml-8 mt-6 ">
            <h3 className="mb-2 font-bold text-4xl pb-3 text-graydark drop-shadow-lg shadow-black dark:text-white">Crear Recepción</h3>
            <p className="text-2xl drop-shadow-lg shadow-black">Crea una recepción, añade la información de tu paciente y sus exámenes a realizar.</p>
          </div>
          {newElement && (
            <button
              onClick={handleClick}
              className="shadow-xl hover:bg-secondary duration-100  font-bold text-xl mr-15  px-15 py-3  md:mt-12 text-white  bg-primary rounded-lg inline-flex items-center"
            >
              {newElement}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default PageHeader;
