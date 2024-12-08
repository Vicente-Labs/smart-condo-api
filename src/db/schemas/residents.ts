import { createId } from '@paralleldrive/cuid2'
import { relations } from 'drizzle-orm'
import { pgTable, text } from 'drizzle-orm/pg-core'

import { condominiums } from './condominiums'
import { users } from './users'

export const residents = pgTable('residents', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),

  condominiumId: text('condominium_id')
    .references(() => condominiums.id, { onDelete: 'cascade' })
    .notNull(),
  userId: text('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
})

export const residentsRelations = relations(residents, ({ one }) => ({
  condominium: one(condominiums, {
    fields: [residents.condominiumId],
    references: [condominiums.id],
  }),
}))
