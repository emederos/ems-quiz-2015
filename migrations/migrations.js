module.exports = {
 up: function(migration, DataTypes) {
        migration.addColumn('Quizzes','tema',{ 
            type: DataTypes.ENUM, 
            allowNull: true, 
            defaultValue: 'otro', 
            values: ['otro','humanidades','ocio','ciencia','tecnologia']})
    },
 down: function(migration, DataTypes) {
        // Lógica en caso de querer revertir los cambios.
    }
}
