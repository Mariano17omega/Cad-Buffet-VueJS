const app = Vue.createApp({
    data() {
        return {
            buffet: {},
            events: [],
            formData: {
                event_id: '',
                date_event: '',
                num_guests: ''
            },
            response: null
        };
    },
    methods: {
        async getBuffetDetails(buffet_id) {
            let response = await fetch(`http://127.0.0.1:3000/api/v1/buffets/${buffet_id}`);
            let data = await response.json();
            this.buffet = data;
        },
        async getEvents(buffet_id) {
            let response = await fetch(`http://127.0.0.1:3000/api/v1/buffets/${buffet_id}/events`);
            let data = await response.json();
            this.events = data;
        },
        async checkAvailability(event_id) {
            this.formData.event_id = event_id;

            try {
                let response = await fetch( 'http://127.0.0.1:3000/api/v1/events/availability?event_id=${this.formData.event_id}&date_event=#{this.formData.date_event}&num_guests=${this.formData.num_guests}');

                if (!response.ok) {
                    throw new Error('Erro na resposta do servidor');
                }

                let data = await response.json();
                this.response = data;
            } catch (error) {
                console.error('Erro:', error);
                console.log(JSON.stringify(this.formData));
                this.response = JSON.stringify(this.response);
            }
        }
    },
    mounted() {
        // Extrair o ID da URL
        const urlParams = new URLSearchParams(window.location.search);
        const buffet_id = urlParams.get('id');
        if (buffet_id) {
            this.getBuffetDetails(buffet_id);
            this.getEvents(buffet_id);
        }
    }
});

app.mount('#app');
