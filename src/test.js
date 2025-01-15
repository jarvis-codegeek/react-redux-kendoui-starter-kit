<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bootstrap Styled Tabulator Table</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Tabulator CSS -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/tabulator/5.6.1/css/tabulator.min.css" rel="stylesheet">
    <style>
        .tabulator-table {
            background: none; /* Remove Tabulator's background color */
            border-collapse: collapse; /* Ensure borders are removed */
        }

        .tabulator-tablerow:nth-child(even) {
            background-color: #f2f2f2; /* Bootstrap's striped row color */
        }

        .tabulator-header .tabulator-col, 
        .tabulator-cell {
            border: 0 !important; /* Remove default border */
            border-right: none !important; /* Remove right border */
        }

        .tabulator-header {
            border-bottom: 1px solid #dee2e6 !important; /* Standard table bottom border */
        }

        .tabulator .tabulator-col:last-child,
        .tabulator .tabulator-cell:last-child {
            border-right: none !important; /* Ensure last column has no right border */
        }

        .tabulator {
            border: none !important; /* Remove Tabulator's border style */
        }

    </style>
</head>
<body>
    <div class="container mt-5">
        <h4 class="text-center">Bootstrap Styled Tabulator Table</h4>
        <!-- Table Container -->
        <div id="tabulator-table"></div>

    </div>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <!-- Tabulator JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/tabulator/5.6.1/js/tabulator.min.js"></script>
    <script>
        // Sample data
        const tableData = [
            { id: 1, name: "Rhona Carey", country: "Northern Mariana Islands", date: "2020-03-12 03:47:43", number: 9761 },
            { id: 2, name: "Jonny Stromberg", country: "Sweden", date: "1990-01-02 13:44:21", number: 1234 },
            { id: 3, name: "Martina Elm", country: "Germany", date: "1986-08-04 23:24:01", number: 5678 },
        ];

        // Tabulator options
        const table = new Tabulator("#tabulator-table", {
            data: tableData,
            layout: "fitColumns",
            columns: [
                { title: "Name", field: "name", sorter: "string", headerFilter: true },
                { title: "Country", field: "country", sorter: "string", headerFilter: "select", headerFilterParams: {
                    values: {
                        "": "Select Country",
                        "Germany": "Germany",
                        "Sweden": "Sweden",
                        "Northern Mariana Islands": "Northern Mariana Islands"
                    }
                }},
                { title: "Date", field: "date", sorter: "date", headerFilter: true },
                { title: "Number", field: "number", sorter: "number", headerFilter: true },
            ],
        });
    </script>
</body>
</html>
