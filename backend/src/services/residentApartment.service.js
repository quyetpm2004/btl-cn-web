import * as residentApartmentRepo from '../repositories/residentApartment.repository.js'

async function assignOwnerToApartment(owner_id, apartment_id, t) {
  if (!owner_id) return

  // Check if they are already living somewhere (active and is_living=true)
  const livingResidency =
    await residentApartmentRepo.getResidentApartmentByResidentId(owner_id, {
      where: { is_living: true }
    })

  // Determine is_living for the new assignment
  // If they are living somewhere else, new one is false.
  // If they are NOT living anywhere, new one is true.
  // If they are living in THIS apartment, it stays true.
  let is_living = true
  if (livingResidency && livingResidency.apartment_id !== apartment_id) {
    is_living = false
  }

  // Check if they already have a relationship with THIS apartment
  const currentResidencyInThisApartment =
    await residentApartmentRepo.getResidentApartmentByResidentId(owner_id, {
      where: { apartment_id }
    })

  if (currentResidencyInThisApartment) {
    // Already associated with this apartment.
    // Update relationship to owner.
    const updateData = { relationship: 'owner' }
    // Only update is_living if we determined it should be true (to set it if it was false)
    // or if we want to enforce the calculated value.
    // Let's enforce it.
    updateData.is_living = is_living

    await residentApartmentRepo.updateResidentApartmentByResidentId(
      owner_id,
      updateData,
      {
        where: { apartment_id },
        transaction: t
      }
    )
  } else {
    // Create new
    await residentApartmentRepo.createResidentApartment(
      {
        resident_id: owner_id,
        apartment_id: apartment_id,
        relationship: 'owner',
        start_date: new Date(),
        is_living: is_living
      },
      { transaction: t }
    )
  }

  return true
}

async function endResidency(resident_id, apartment_id, t) {
  return residentApartmentRepo.updateResidentApartmentByResidentId(
    resident_id,
    { end_date: new Date() },
    {
      where: {
        apartment_id: apartment_id
      },
      transaction: t
    }
  )
}

async function endAllResidenciesInApartment(apartment_id, t) {
  return residentApartmentRepo.updateResidentApartmentByApartmentId(
    apartment_id,
    { end_date: new Date() },
    { transaction: t }
  )
}

async function getCurrentOwner(apartment_id) {
  return residentApartmentRepo.getCurrentOwnerByApartmentId(apartment_id)
}

export const residentApartmentService = {
  assignOwnerToApartment,
  endResidency,
  endAllResidenciesInApartment,
  getCurrentOwner
}
