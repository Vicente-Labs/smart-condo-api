import { createId } from '@paralleldrive/cuid2'
import { relations } from 'drizzle-orm'
import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

import { commonSpaces } from './common-spaces'
import { residents } from './residents'

export const condominiums = pgTable('condominiums', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),

  name: text('name').notNull(),
  description: text('description').notNull(),
  address: text('address').notNull(),
  monthlyBaseFee: integer('monthly_base_fee').notNull(),

  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' })
    .notNull()
    .defaultNow(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' })
    .notNull()
    .defaultNow(),
})

export const condominiumsRelations = relations(condominiums, ({ many }) => ({
  commonSpaces: many(commonSpaces),
  residents: many(residents),
}))
