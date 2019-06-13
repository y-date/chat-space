# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

# DB設計

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|text|null: false|
|email|varchar(255)|null: false|
|users_groups_id|int|foreign_key: true|

##### 上記に加え、password関連とtimestampsも用意。
##### timestampsは下記のテーブルに全て用意。

### Association
- has_many :groups, through :users_groups
- has_many :messages


## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|users_groups_id|int|foreign_key: true|

### Association
- has_many :users, through :users_groups
- has_many :messages


## users_groupsテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group


## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|text|text||
|image|text||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group



* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
