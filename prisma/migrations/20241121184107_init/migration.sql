-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PROCESSING', 'FULFILLED', 'CANCELED');

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "orderStatus" "OrderStatus" NOT NULL DEFAULT 'PENDING';
