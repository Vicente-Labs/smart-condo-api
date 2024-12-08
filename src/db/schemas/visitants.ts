import { createId } from '@paralleldrive/cuid2'
import { relations } from 'drizzle-orm'
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'

import { users } from './users'

export const visitants = pgTable('visitants', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),

  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  avatarUrl: text('avatar_url'),

  responsibleId: text('responsible_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),

  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' })
    .notNull()
    .defaultNow(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' })
    .notNull()
    .defaultNow(),
})

export const visitantsRelations = relations(visitants, ({ one }) => ({
  responsible: one(users, {
    fields: [visitants.responsibleId],
    references: [users.id],
  }),
}))
