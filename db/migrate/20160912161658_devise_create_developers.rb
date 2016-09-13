class DeviseCreateDevelopers < ActiveRecord::Migration
  def change
    create_table :developers do |t|
      ## Database authenticatable
      t.string :name, null: false, default: ""
      t.string :email, null: false, default: ""
      t.string :login, null: false, default: ""
      t.string :provider, null: false, default: ""
      t.string :uid, null: false, default: ""
      t.string :access_token, null: false, default: ""
      t.boolean :remote, default: false, index: true
      t.boolean :relocate, default: false, index: true
      t.boolean :available, default: false, index: true
      t.string :jobs, null: false, default: "{}", array: true
      t.string :platforms, null: false, default: "{}", array: true
      t.string :city, null: false, default: "", index: true
      t.string :encrypted_password, null: false, default: ""
      t.jsonb :data, null: false, default: "{}"

      ## Trackable
      t.integer  :sign_in_count, default: 0, null: false
      t.datetime :current_sign_in_at
      t.datetime :last_sign_in_at
      t.inet     :current_sign_in_ip
      t.inet     :last_sign_in_ip

      t.timestamps null: false
    end

    add_index :developers, :email, unique: true
    add_index :developers, :login, unique: true
    add_index :developers, :data, using: :gin
    add_index :developers, :platforms, using: :gin
    add_index :developers, :jobs, using: :gin
  end
end
