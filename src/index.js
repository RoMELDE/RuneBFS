import 'popper.js'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-select'
import 'bootstrap-select/dist/css/bootstrap-select.min.css'

import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { faGlobe, faDatabase, faUndo, faRedo } from '@fortawesome/free-solid-svg-icons'
library.add(faGlobe, faDatabase, faUndo, faRedo)
dom.watch()

import './style.css'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.start();

import Ui from './js/ui.js';
import Router from './js/router.js';
import Data from './js/data.js'

NProgress.set(0.1);
Ui.init();
NProgress.set(0.3);
Data.init().then(function () {
    NProgress.set(0.9);
    Router.init();
    NProgress.done();
});