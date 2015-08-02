// Definición del modelo de Quiz

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Quiz',
            { pregunta: {
                type: DataTypes.STRING,
                validate: { notEmpty: { msg: "-> Falta pregunta" }}
              },
              respuesta: {
                type: DataTypes.STRING,
                validate: { notEmpty: { msg: "-> Falta respuesta" }}
              },
              tema: {
                type: DataTypes.ENUM,
                values: ['otro','humanidades','ocio','ciencia','tecnologia'],
                defaultValue: 'otro',
                validate: { isIn: [['otro','humanidades','ocio','ciencia','tecnologia']] } 
              }
            });
}
