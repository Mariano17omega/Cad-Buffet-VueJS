const app = Vue.createApp({
    data() {
        return {
            buffets: [],
            searchBuffet: ''
        };
    },
    methods: {
        getData(name_buffet = "") {
            let url = 'http://127.0.0.1:3000/api/v1/buffets';
            if (name_buffet !== "") {
                url = `http://127.0.0.1:3000/api/v1/buffets/search?query=${name_buffet}`;
            }
            return fetch(url) 
                .then(response => response.json()) 
                .then(data => {
                    this.buffets = []; 
                    data.forEach(item => {
                        var buffet = new Object();
                        buffet.id = item.id;
                        buffet.brand_name = item.brand_name;
                        buffet.contact_phone = item.contact_phone;
                        buffet.contact_email = item.contact_email;
                        buffet.address = item.address;
                        buffet.district = item.district;
                        buffet.state = item.state;
                        buffet.city = item.city;
                        buffet.cep = item.cep;
                        buffet.description = item.description;
                        buffet.user_owner_id = item.user_owner_id;
                        buffet.payment_method = item.payment_method;

                        this.buffets.push(buffet); 
                    });
                });
        }
    },
    watch: {
        searchBuffet(newSearchBuffet) {
            this.getData(newSearchBuffet);  
        }
    },
    mounted() {
        this.getData();  
    }
});

app.mount('#app');
