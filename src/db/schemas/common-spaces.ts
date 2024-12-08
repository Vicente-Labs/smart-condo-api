import { createId } from '@paralleldrive/cuid2'
import { relations } from 'drizzle-orm'
import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

import { condominiums } from './condominiums'

export const commonSpaces = pgTable('common_spaces', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),

  name: text('name').notNull(),
  description: text('description').notNull(),
  maxOccupancy: integer('max_occupancy').notNull(),
  cost: integer('cost').notNull(),

  condominiumId: text('condominium_id')
    .references(() => condominiums.id, { onDelete: 'cascade' })
    .notNull(),

  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' })
    .notNull()
    .defaultNow(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' })
    .notNull()
    .defaultNow(),
})

export const commonSpacesRelations = relations(commonSpaces, ({ one }) => ({
  condominium: one(condominiums, {
    fields: [commonSpaces.condominiumId],
    references: [condominiums.id],
  }),
}))
