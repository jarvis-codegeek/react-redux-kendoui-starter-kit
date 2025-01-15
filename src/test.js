<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tabulator Table with Embedded Search and Sort</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Tabulator CSS -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/tabulator/4.9.3/css/tabulator.min.css" rel="stylesheet">
</head>
<body>
    <div class="container mt-5">
        <h4 class="text-center">Tabulator Table with Embedded Search and Sort</h4>
        <!-- Table Container -->
        <div id="tabulator-table"></div>
    </div>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <!-- Tabulator JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/tabulator/4.9.3/js/tabulator.min.js"></script>
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

.custom-form-control {
            display: block;
            width: 100%;
            padding: 0.375rem 0.75rem;
            font-size: 1rem;
            font-weight: 400;
            line-height: 1.5;
            color: #495057;
            background-color: #fff;
            background-clip: padding-box;
            border: 1px solid #ced4da;
            border-radius: 0.25rem;
            transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        }

        .custom-form-control:focus {
            border-color: #80bdff;
            outline: 0;
            box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
        }

        .custom-form-control::placeholder {
            color: #6c757d;
            opacity: 1;
        }
.tabulator-table {
            background: none; /* Remove Tabulator's default background color */
            border-collapse: collapse; /* Ensure borders are removed */
        }

        .tabulator-row:nth-child(odd) {
            background-color: #f9f9f9; /* Light gray background for odd rows */
            border-bottom: 1px solid #ddd; /* Bottom border */
        }

        .tabulator-row:nth-child(even) {
            background-color: #fff; /* White background for even rows */
            border-bottom: 1px solid #ddd; /* Bottom border */
        }

        .tabulator-row:hover {
            background-color: #f1f1f1; /* Hover effect */
        }

        .tabulator-cell {
            border-right: 1px solid #ddd; /* Right border for cells */
        }
