import {render} from 'react-dom'
import { App } from './App'
import React from "react";
import { API } from '../../services/api';

/**
 *
 *
 * @export
 * @param {API} api
 */
export async function initApp(api){
    render(
        <App api={api} />,
        document.getElementById('app-content')
    );
}

