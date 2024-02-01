import { createStore } from "vuex";
import axios from "axios";

export default createStore({
    state: {
        spendingList: [],
        spendingListSec: [],
        tabsList: [
            "За все время",
            "Сегодня",
            "Вчера",
            // "Неделя",
            // "Прошлая неделя",
            "Месяц",
            "Прошлый месяц",
            "Год",
        ],
        allActive: true,
        overFlow: false,
        today: null,
        deleteActive: false,
        activeHeadItem: 'За все время',
        URL:'https://6567a1e764fcff8d7310b7b2.mockapi.io/spending',
    },
    mutations: {
        updateSpendingList(state, item) {
            state.spendingList = item;
            state.spendingListSec = state.spendingList;
        },
        sortTime(state, item) {
            const today = state.today;

            const FakeYesterday = new Date(Date.now() - 86400000);
            const daySec = FakeYesterday.getDate();
            const monthSec = FakeYesterday.getMonth() + 1; // Месяцы в JavaScript начинаются с 0 (январь) до 11 (декабрь)
            const yearSec = FakeYesterday.getFullYear();

            const yesterday = `${daySec}.${monthSec}.${yearSec}`; 

            const mounth = today.split(".")[1];
            const year = today.split(".")[2];

            switch (item) {
                case "Сегодня":
                    state.spendingListSec = state.spendingList.filter(
                        (item) => item.date == state.today
                    );
                    break;
                case "Вчера":      
                    state.spendingListSec = state.spendingList.filter(
                        (item) => item.date == yesterday
                    );
                    break;
                case "Неделя":
                    function getPreviousDay(date = new Date()) {
                        const previous = new Date(date.getTime());
                        previous.setDate(date.getDate() - 7);
                        return previous;
                    }
                     

                    const sevenDaysAgoDate = getPreviousDay(new Date(today));
                    const formattedDate = `${sevenDaysAgoDate.getDate()}.${sevenDaysAgoDate.getMonth() + 2 > 12 ? sevenDaysAgoDate.getMonth() + 2 - 12 : sevenDaysAgoDate.getMonth() + 2 }.${sevenDaysAgoDate.getFullYear() + 1}`;
                    console.log(formattedDate ); 
                    state.spendingListSec = state.spendingList.filter(
                        (item) =>
                        console.log(item.date.split(".")[0] >= formattedDate.split(".")[0])
                            //  &&
                            // item.date.split(".")[1] <= formattedDate.split(".")[1] 
                            // item.date.split(".")[2] >= formattedDate.split(".")[2]
                    );
                    break;
                case "Месяц":
                    state.spendingListSec = state.spendingList.filter(
                        (item) =>
                            item.date.split(".")[1] == mounth &&
                            item.date.split(".")[2] == year
                    );
                    break;
                case "Прошлый месяц":  
                if (mounth - 1  == 0) {  
                    state.spendingListSec = state.spendingList.filter(
                        (item) =>
                            item.date.split(".")[1] == 12 &&
                            item.date.split(".")[2] == year - 1
                    );
                }  else {
                    state.spendingListSec = state.spendingList.filter(
                        (item) =>
                            item.date.split(".")[1] == mounth - 1 &&
                            item.date.split(".")[2] == year
                    );
                } 
                    break;
                case "Год":
                    state.spendingListSec = state.spendingList.filter(
                        (item) => item.date.split(".")[2] == year
                    );
                    break;
                default:
                    state.spendingListSec = state.spendingList;
            }
            state.activeHeadItem = item;
        },
        setToday(state, item) {
            state.today = item;
        },
        deleteShow(state) {
            state.deleteShow = !state.deleteShow;
        },
        setGiveItem(state, item) {
            state.deleteActive = item;
        },
        setUnsetDeleteActive(state) {
            state.deleteActive = false;
        },  
    },
    actions: {
        async getData({commit, state}) {
            try {
                const response = await axios.get(state.URL);
                commit("updateSpendingList", response.data);
                commit("sortTime", state.activeHeadItem);
            } catch (error) {
                console.error("Ошибка:", error);
            }
        },

        async setAddSpending({ dispatch, state}, newData) {
            try {
                await axios.post(state.URL ,newData); 
                await dispatch("getData"); 
            } catch (error) {
                console.error("Ошибка при добавлении данных", error);
                throw error;
            }
        },

        async setDeleteItem({state, dispatch }, id) {
            try {
                await axios.delete(`${state.URL}/${id}`);  
                await dispatch("getData"); 
            } catch (error) {
                console.error("Ошибка при удалении данных", error);
                throw error;
            }
        },

        async updeteItem({state, dispatch }, { idItem, newData }) {   
            try {
              await axios.put(`${state.URL}/${idItem}`, newData);  
              await dispatch("getData"); 
            } catch (error) {
              console.error('Error updating object:', error);
              throw error; 
            }
             
        },
    },
    getters: {},
});
