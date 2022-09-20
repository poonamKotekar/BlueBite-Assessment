import React from 'react';
import { useParams } from 'react-router';
import Components from "./components/Components";

const App = () => {
    const { id } = useParams<{ id: string }>();
       return (
           <div>
               <Components />
           </div>
       );
};
export default App;
