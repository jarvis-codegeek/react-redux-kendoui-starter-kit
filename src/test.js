const DownloadButton = () => {
  const handleDownload = async () => {
    try {
      // Make the API call
      const response = await axios.get('http://localhost:5000/api/data', {
        responseType: 'blob', // Ensure the response is treated as a file
      });

      // Create a Blob from the JSON response
      const blob = new Blob([response.data], { type: 'application/json' });

      // Create a temporary link element
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'data.json'; // Specify the file name

      // Append the link, trigger a click, and remove the link
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading the file', error);
    }
  };

  return <button onClick={handleDownload}>Download JSON</button>;
};


 <Snackbar
        open={open}
        autoHideDuration={3000} // Toast automatically hides after 3 seconds
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} // Position of the toast
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          This is a success message!
        </Alert>
      </Snackbar>
.label-critical {
            background-color: #dc3545; /* Red */
            color: #fff;
            padding: 0.2em 0.5em;
            border-radius: 0.25em;
        }
        .label-high {
            background-color: #ffc107; /* Yellow */
            color: #000;
            padding: 0.2em 0.5em;
            border-radius: 0.25em;
        }
        .label-medium {
            background-color: #17a2b8; /* Teal */
            color: #fff;
            padding: 0.2em 0.5em;
            border-radius: 0.25em;
        }
        .label-low {
            background-color: #28a745; /* Green */
            color: #fff;
            padding: 0.2em 0.5em;
            border-radius: 0.25em;
        }
