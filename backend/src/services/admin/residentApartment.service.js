import * as residentApartmentRepo from '../../repositories/residentApartment.repository.js'

/**
 * If owner_id is provided, assign them as owner to the apartment.
 * @param {*} owner_id
 * @param {*} apartment_id
 * @param {*} is_living_here
 * @param {*} t
 * @returns
 */
async function assignOwnerToApartment(
  owner_id,
  apartment_id,
  is_living_here,
  t
) {
  if (!owner_id) return

  // If user wants to live here, we need to clear other living statuses
  if (is_living_here) {
    const livingResidency =
      await residentApartmentRepo.getResidentApartmentByResidentId(owner_id, {
        where: { is_living: true }
      })

    if (livingResidency && livingResidency.apartment_id !== apartment_id) {
      await residentApartmentRepo.updateResidentApartmentByResidentId(
        owner_id,
        { is_living: false },
        {
          where: { apartment_id: livingResidency.apartment_id },
          transaction: t
        }
      )
    }
  }

  // Check if they already have a relationship with THIS apartment
  const currentResidencyInThisApartment =
    await residentApartmentRepo.getResidentApartmentByResidentId(owner_id, {
      where: { apartment_id }
    })

  if (currentResidencyInThisApartment) {
    // Already associated with this apartment.
    // Update relationship to owner.
    await residentApartmentRepo.updateResidentApartmentByResidentId(
      owner_id,
      { relationship: 'owner', is_living: is_living_here },
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
        is_living: is_living_here
      },
      { transaction: t }
    )
  }
  return true
}

async function changeOwnerToMember(resident_id, apartment_id, t) {
  return residentApartmentRepo.updateResidentApartmentByResidentId(
    resident_id,
    {
      relationship: 'member'
    },
    {
      where: { apartment_id },
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

async function addResidentToApartment(resident_id, apartment_id) {
  // Check if already in apartment
  const currentResidency =
    await residentApartmentRepo.getResidentApartmentByResidentId(resident_id, {
      where: { apartment_id, end_date: null }
    })

  if (currentResidency) {
    // Already active
    if (!currentResidency.is_living) {
      return residentApartmentRepo.updateResidentApartmentByResidentId(
        resident_id,
        { is_living: true },
        {
          where: { apartment_id, end_date: null }
        }
      )
    }
  }

  await residentApartmentRepo.updateResidentApartmentByResidentId(
    resident_id,
    { is_living: false },
    {
      where: { is_living: true }
    }
  )

  // Create new
  await residentApartmentRepo.createResidentApartment({
    resident_id,
    apartment_id,
    relationship: 'member', // Default to member
    start_date: new Date(),
    is_living: true
  })
}

async function removeResidentFromApartment(resident_id, apartment_id) {
  return residentApartmentRepo.updateResidentApartmentByResidentId(
    resident_id,
    { end_date: new Date(), is_living: false },
    { where: { apartment_id, end_date: null } }
  )
}

export const residentApartmentService = {
  assignOwnerToApartment,
  changeOwnerToMember,
  endAllResidenciesInApartment,
  getCurrentOwner,
  addResidentToApartment,
  removeResidentFromApartment
}
