import { actions } from 'mirrorx';
import * as api from 'services/Init';


export default {
    name: "init",
    initialState: {
        currStep: 0,
        repoData: [],
        selectId: '',
        selectName: ''
    },
    reducers: {
        save(state, data) {
            return {
                ...state,
                ...data
            }
        }
    },
    effects: {
        init(data, getState) {
            actions.routing.push({
                pathname: '/init'
            });
        },
        clear() {
            actions.init.save({
                selectId: '',
                selectName: ''
            });
        },
        setStep(page, getState) {
            console.log(page);
            let { currStep } = getState().init;
            let nextStep = currStep + 1;
            if (typeof page) {
                nextStep = page;
            }
            actions.init.save({ currStep: nextStep });
        },
        selectTemplate(obj, getState) {
            let { selectId, selectName } = obj;
            actions.init.save({ selectId, selectName });
        },
        async loadGithubOrgn() {
            let { data } = await api.get();
            actions.init.save({ repoData: data });
            console.log(data);
            return data;
        }
    }
}