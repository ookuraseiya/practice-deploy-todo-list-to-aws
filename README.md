# 🚀 Todo List (Next.js / Express.js / MySQL) × AWS

## 📌 概要
過去に業務でAWSを使用していましたが、期間が空いてしまったため、
復習を目的として Next.js(TypeScript)/Express.js(TypeScript)/MySQLを使用したTODOリストアプリケーションの本番デプロイ構成を一から構築しました。

インフラ〜アプリケーション公開までを一貫して実装しています。（[デプロイ先リンク](https://practice-deploy-todo-list-to-aws.org/)

## 🏗️ 構成図
comming soon...
<!-- <img width="550" height="500" alt="AWS 構成図 drawio" src="https://github.com/user-attachments/assets/9cbe22da-231b-491e-9175-85fc7de99248" /> -->

## 🧩 技術構成
- フロントエンド
  - Next.js
  - TypeScript
- バックエンド
  - Express.js
  - TypeScript
- データベース
  - MySQL
- インフラ
  - EC2（アプリケーションサーバ）
  - Nginx（リバースプロキシ）
  - RDS（データベース）
  - ALB（Application Load Balancer）
  - Route53（DNS）
  - ACM（SSL証明書）
  - VPC / Subnet（Public構成）
- ドメイン
  - お名前.com（ドメイン取得）
  - Route53へ委任
