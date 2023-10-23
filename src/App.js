
import { Route, Routes, useRoutes } from 'react-router-dom';
import './App.scss';
import CardContainer from './pages/CardContainer';
import { Navigate } from 'react-router-dom';
import Header from './components/Header';
import '@progress/kendo-theme-default/dist/all.css';
import FormContainer from './pages/Form';

function App() {

    const routes = useRoutes([
        { path: "/", element: <Navigate to="/onboarding" />},
        { path: "/onboarding", element: <CardContainer />},
        { path: "/formContainer", element: <FormContainer />}
      ])

    return (
        <div className='App'>
            <Header />
            {routes}
        </div>
    )
    
}

export default App;
