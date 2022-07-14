import React, { useMemo } from "react"
import Table from "./Table"

import Loader from "../../../assets/imgs/loader.svg"

const TableSection = React.memo(() => {
    const columns = [
        { Header: "customer ID", accessor: "0" },
        { Header: "company  Name", accessor: "1" },
        { Header: "contact  Name", accessor: "2" },
        { Header: "contact  Title", accessor: "3" },
        { Header: "address", accessor: "4" },
        { Header: "city", accessor: "5" },
        { Header: "region", accessor: "6" },
        { Header: "postal  Code", accessor: "7" },
        { Header: "country", accessor: "8" },
        { Header: "phone", accessor: "9" },
        { Header: "fax", accessor: "10" },
    ]
    const data = [
        {
            0: "customerID",
            1: "companyName",
            2: "contactName",
            3: "contactTitle",
            4: "address",
            5: "city",
            6: "region",
            7: "postalCode",
            8: "country",
            9: "phone",
            10: "fax",
        },
        {
            0: "ALFKI",
            1: "Alfreds Futterkiste",
            2: "Maria Anders",
            3: "Sales Representative",
            4: "Obere Str. 57",
            5: "Berlin",
            6: "NULL",
            7: "12209",
            8: "Germany",
            9: "030-0074321",
            10: "030-0076545",
        },
        {
            0: "ANATR",
            1: "Ana Trujillo Emparedados y helados",
            2: "Ana Trujillo",
            3: "Owner",
            4: "Avda. de la ConstituciÃ³n 2222",
            5: "MÃ©xico D.F.",
            6: "NULL",
            7: "05021",
            8: "Mexico",
            9: "(5) 555-4729",
            10: "(5) 555-3745",
        },
        {
            0: "ANTON",
            1: "Antonio Moreno TaquerÃ­a",
            2: "Antonio Moreno",
            3: "Owner",
            4: "Mataderos  2312",
            5: "MÃ©xico D.F.",
            6: "NULL",
            7: "05023",
            8: "Mexico",
            9: "(5) 555-3932",
            10: "NULL",
        },
        {
            0: "AROUT",
            1: "Around the Horn",
            2: "Thomas Hardy",
            3: "Sales Representative",
            4: "120 Hanover Sq.",
            5: "London",
            6: "NULL",
            7: "WA1 1DP",
            8: "UK",
            9: "(171) 555-7788",
            10: "(171) 555-6750",
        },
        {
            0: "BERGS",
            1: "Berglunds snabbkÃ¶p",
            2: "Christina Berglund",
            3: "Order Administrator",
            4: "BerguvsvÃ¤gen  8",
            5: "LuleÃ¥",
            6: "NULL",
            7: "S-958 22",
            8: "Sweden",
            9: "0921-12 34 65",
            10: "0921-12 34 67",
        },
        {
            0: "BLAUS",
            1: "Blauer See Delikatessen",
            2: "Hanna Moos",
            3: "Sales Representative",
            4: "Forsterstr. 57",
            5: "Mannheim",
            6: "NULL",
            7: "68306",
            8: "Germany",
            9: "0621-08460",
            10: "0621-08924",
        },
        {
            0: "BLONP",
            1: "Blondesddsl pÃ¨re et fils",
            2: "FrÃ©dÃ©rique Citeaux",
            3: "Marketing Manager",
            4: "24 place KlÃ©ber",
            5: "Strasbourg",
            6: "NULL",
            7: "67000",
            8: "France",
            9: "88.60.15.31",
            10: "88.60.15.32",
        },
        {
            0: "BOLID",
            1: "BÃ³lido Comidas preparadas",
            2: "MartÃ­n Sommer",
            3: "Owner",
            4: "67C Araquil",
            5: "Madrid",
            6: "NULL",
            7: "28023",
            8: "Spain",
            9: "(91) 555 22 82",
            10: "(91) 555 91 99",
        },
        {
            0: "BONAP",
            1: "Bon app'",
            2: "Laurence Lebihan",
            3: "Owner",
            4: "12 rue des Bouchers",
            5: "Marseille",
            6: "NULL",
            7: "13008",
            8: "France",
            9: "91.24.45.40",
            10: "91.24.45.41",
        },
    ]
    const queryData = useMemo(() => data.slice(1), [data])
    console.log("columns", columns)
    console.log("queryData", queryData)
    if (false)
        return (
            <section className="col-start-1 col-end-3 row-start-3 row-end-4 text-white m-6">
                <h1 className="text-center font-bold text-xl text-primary-dark">
                    Something Went Wrong{" "}
                    <span role="img" aria-label="sad face">
                        😔
                    </span>
                </h1>
            </section>
        )
    return (
        <>
            <section className="table-wrapper col-start-1 col-end-3 row-start-3 row-end-4 text-white my-12 overflow-hidden">
                {data.length > 0 ? (
                  <Table columns={columns} data={queryData} />
                ) : (
                  <img src={Loader} className="w-20 mx-auto" alt="loader" />
                )}
            </section>
        </>
    )
})

export default TableSection
