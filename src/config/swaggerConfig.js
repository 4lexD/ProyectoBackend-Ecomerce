const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'documentacion de api con swagger',
            description: "documentacion de api con swagger"
        }
    },
    apis: ['src/docs/**/*.yaml']
}

export default swaggerOptions;