import Breadcrumb from "../../components/Breadcrumb";
import TableOne from "../../components/TableOne";
import DefaultLayout from "../../layout/DefaultLayout";


const Reception = () => {
    const pageName = "Recepción";
    const newReception = "+ Nueva Recepción";
    return (
        <DefaultLayout newReception={newReception}>
            <Breadcrumb pageName={pageName} />
            <div className="flex flex-col gap-10">
                <TableOne />
            </div>
        </DefaultLayout>
    );
};

export default Reception;