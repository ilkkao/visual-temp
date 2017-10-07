exports.up = pgm => {
  pgm.createTable('temperatures', {
    ts: {
      type: 'timestamp',
      unique: true,
      primaryKey: true,
      notNull: true
    },
    value: {
      type: 'real',
      unique: false,
      primaryKey: false,
      notNull: true
    }
  });
};

exports.down = pgm => {
  pgm.dropTable('temperatures');
};
